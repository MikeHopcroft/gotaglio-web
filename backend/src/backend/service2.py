# From gotaglio-web/backend, run with python -m src.backend.service

from hashlib import blake2b
import json
from uuid import uuid4
from sqlalchemy import create_engine, event
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import Session, sessionmaker
from .models import Base, Case
from .schemas import CaseCreate, CaseRead, CaseUpdate


def to_dict(obj):
    return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}


keys_to_exclude = {"id", "mutable_fields"}


def hash_case(case: Case) -> str:
    h = blake2b(digest_size=32)
    hashable = {k: case[k] for k in case.keys() - keys_to_exclude}
    h.update(json.dumps(hashable, sort_keys=True).encode("utf-8"))
    return h.hexdigest()


class Service:
    def __init__(self, db: Session):
        self.db = db

    def create(self, versioned, hashed, model, record):
        result = record.model_dump()
        if versioned:
            result["sequence"] = 0
            result["previous"] = None
        if hashed:
            result["id"] = hash_case(result)
        else:
            result["id"] = uuid4().hex
        result_orm = model(**result)
        self.db.add(result_orm)
        self.db.commit()
        return result_orm

    def update_versioned(self, model, edited):
        original_orm = self.db.query(model).filter(model.id == edited.id).first()

        # Apply changes to original case.
        result = to_dict(original_orm)
        result["versioned_fields"] = edited.versioned_fields
        result["mutable_fields"] = edited.mutable_fields

        # Check whether the changes trigger a new version.
        id = hash_case(result)
        if id != result["id"]:
            # This is a new version.
            # Update provenance and compute new hash.
            result["previous"] = result["id"]
            result["sequence"] = result["sequence"] + 1
            result["id"] = hash_case(result)

        result_orm = model(**result)
        self.db.add(result_orm)
        self.db.commit()
        return result_orm

    def update(self, model, edited):
        result_orm = model(**edited)
        self.db.add(result_orm)
        self.db.commit()
        return result_orm


def main():
    # Setup in-memory SQLite
    engine = create_engine("sqlite:///:memory:", echo=False, future=True)

    @event.listens_for(engine, "connect")
    def enforce_foreign_keys(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    service = Service(db)

    # Create a new case (first version)
    case1 = CaseCreate(
        basis=None,
        creator="run-1",
        mutable_fields={"title": "Example case"},
        versioned_fields={"input": "User said hello", "expected": "Hi there!"},
    )
    result1 = service.create(True, True, Case, case1)
    print("Created case 1:", result1.id)
    print(CaseRead.model_dump(CaseRead.model_validate(result1)))

    print()

    case2 = CaseUpdate(
        id=result1.id,
        mutable_fields=result1.mutable_fields,
        versioned_fields={"input": "User text changed", "expected": "Hi there!"},
    )
    result2 = service.update_versioned(Case, case2)
    print("Updated case 1:", result2.id)
    print(CaseRead.model_dump(CaseRead.model_validate(result2)))


if __name__ == "__main__":
    main()
