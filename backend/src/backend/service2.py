# From gotaglio-web/backend, run with python -m src.backend.service

from hashlib import blake2b
import json
from sqlalchemy import create_engine, event
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import Session, sessionmaker
from .models import Base, Case
from .schemas import CaseCreate, CaseRead, CaseUpdate


def to_dict(obj):
    return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}


def compute_hash(
    immutable_fields: dict, previous: str | None, basis: str | None, creator: str
) -> str:
    h = blake2b(digest_size=32)
    combined = {
        "immutable_fields": immutable_fields,
        "previous": previous,
        "basis": basis,
        "creator": creator,
    }
    h.update(json.dumps(combined, sort_keys=True).encode("utf-8"))
    return h.hexdigest()


keys_to_exclude = {"id", "mutable_fields"}


def hash_case(case: Case) -> str:
    h = blake2b(digest_size=32)
    hashable = {k: case[k] for k in case.keys() - keys_to_exclude}
    h.update(json.dumps(hashable, sort_keys=True).encode("utf-8"))
    return h.hexdigest()


"""
Remove schema param from generic functions - just dump model columns
Rename "immutable_fields" to "versioned_fields".
x Create new "immutable_fields" for fields like "creator", "basis", etc.
x   Not sure this is right. Really want "creator" and "basis" to be
x   database columns - not buried in JSON immutable_fields.
x Keep previous and sequence as is.

Generic create function takes an ORM model constructor (e.g. Case()) and a dictionary of fields.
"""


class Service:
    def __init__(self, db: Session):
        self.db = db

    def create_generic(self, model, record):
        result = record.model_dump()
        result["sequence"] = 1
        result["previous"] = None
        result["id"] = hash_case(result)
        result_orm = model(**result)
        self.db.add(result_orm)
        self.db.commit()
        return result_orm

    def update_generic(self, model, edited):
        original_orm = self.db.query(model).filter(model.id == edited.id).first()

        # Apply changes to original case.
        result = to_dict(original_orm)
        result["immutable_fields"] = edited.immutable_fields
        result["mutable_fields"] = edited.mutable_fields

        # Check whether the changes trigger a new version.
        id = hash_case(result)
        if id != result["id"]:
            # This is a new version. Update provenance and compute
            # new hash.
            result["previous"] = result["id"]
            result["sequence"] = result["sequence"] + 1
            result["id"] = hash_case(result)

        result_orm = model(**result)
        self.db.add(result_orm)
        self.db.commit()
        return result_orm

    def create_case(self, edited: CaseCreate) -> Case:
        result = dict()
        result["sequence"] = 1
        result["previous"] = None
        result["creator"] = edited.creator
        result["basis"] = edited.basis
        result["immutable_fields"] = edited.immutable_fields
        result["mutable_fields"] = edited.mutable_fields
        result["id"] = hash_case(result)
        result_orm = Case(**result)
        self.db.add(result_orm)
        self.db.commit()
        return result_orm

    def update_case(self, edited: CaseUpdate) -> Case:
        original_orm = self.db.query(Case).filter(Case.id == edited.id).first()
        original_pydantic = CaseRead.model_validate(original_orm)
        original = CaseRead.model_dump(original_pydantic)

        # Apply changes to original case.
        result = dict(original)
        result["immutable_fields"] = edited.immutable_fields
        result["mutable_fields"] = edited.mutable_fields

        # Check whether the changes trigger a new version.
        id = hash_case(result)
        if id != original["id"]:
            # This is a new version. Update provenance and compute
            # new hash.
            result["previous"] = original["id"]
            result["sequence"] = original["sequence"] + 1
            result["id"] = hash_case(result)

        result_orm = Case(**result)
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
        immutable_fields={"input": "User said hello", "expected": "Hi there!"},
    )
    result1 = service.create_generic(Case, case1)
    # result1 = service.create_case(case1)
    print("Created case 1:", result1.id)
    print(CaseRead.model_dump(CaseRead.model_validate(result1)))

    print()

    case2 = CaseUpdate(
        id=result1.id,
        mutable_fields=result1.mutable_fields,
        immutable_fields={"input": "User text changed", "expected": "Hi there!"},
    )
    result2 = service.update_generic(Case, case2)
    # result2 = service.update_case(case2)
    print("Updated case 1:", result2.id)
    print(CaseRead.model_dump(CaseRead.model_validate(result2)))


if __name__ == "__main__":
    main()
