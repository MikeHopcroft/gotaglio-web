# From gotaglio-web/backend, run with python -m src.backend.service

from hashlib import blake2b
import json
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session, sessionmaker
from .models import Base, Case
from .schemas import CaseCreate, CaseRead, CaseUpdate
from typing import List, Optional


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


def process_case(original: Case | None, edited: Case) -> Case:
    if original is None:
        # This is a new case.
        # Don't need to check basis and creator fields because
        # bad values will result in a referential integrity error.
        result = dict()
        result["sequence"] = 1
        result["previous"] = None
        result["creator"] = edited.creator
        result["basis"] = edited.basis
        result["immutable_fields"] = edited.immutable_fields
        result["mutable_fields"] = edited.mutable_fields
        result["id"] = hash_case(result)
    else:
        # The changes are applied to an existing case.
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

    return result
    # return Case(**result)


class CaseService:
    def __init__(self, db: Session):
        self.db = db

    def upsert_case(self, edited: CaseCreate) -> Case:
        original = (
            self.db.query(Case).filter(Case.id == edited.id).first()
            if hasattr(edited, "id")
            else None
        )
        updated = process_case(original, edited)
        self.db.add(updated)
        self.db.commit()
        return updated

    def create_case(self, edited: CaseCreate):
        result = dict()
        result["sequence"] = 1
        result["previous"] = None
        result["creator"] = edited.creator
        result["basis"] = edited.basis
        result["immutable_fields"] = edited.immutable_fields
        result["mutable_fields"] = edited.mutable_fields
        result["id"] = hash_case(result)
        orm_case = Case(**result)
        self.db.add(orm_case)
        self.db.commit()
        return result

    def update_case(self, edited: CaseUpdate):
        original_orm = self.db.query(Case).filter(Case.id == edited.id).first()
        original_pydantic = CaseRead.model_validate(original_orm)
        # original_pydantic = CaseRead.model_dump(original_orm)
        # original = original_pydantic.dict()
        original = CaseRead.model_dump(original_pydantic)
        updated = process_case(original, edited)
        orm_case = Case(**updated)
        self.db.add(orm_case)
        self.db.commit()
        return updated
    

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

    service = CaseService(db)

    # Create a new case (first version)
    case1 = CaseCreate(
        basis=None,
        creator="run-1",
        mutable_fields={"title": "Example case"},
        immutable_fields={"input": "User said hello", "expected": "Hi there!"},
    )
    result1 = service.create_case(case1)
    print("Created case 1:", result1["id"])

    case2 = CaseUpdate(
        id=result1["id"],
        mutable_fields=result1["mutable_fields"],
        immutable_fields={"input": "User text changed", "expected": "Hi there!"},
    )
    # # result1.basis = 'hi'
    # # result1.immutable_fields["input"] = "hi"
    result2 = service.update_case(case2)
    print("Updated case 1:", result2["id"])

    # # Upsert a modified version (edit)
    # case2 = CaseCreate(
    #     previous=result1.id,
    #     basis=None,
    #     creator="run-1",
    #     mutable_fields={"title": "Updated case"},
    #     immutable_fields={"input": "User said hello", "expected": "Hi there!"}
    # )
    # result2 = service.upsert_case(case2)
    # print("Upserted case 2:", result2.id)

    # # Upsert an identical case (should return existing)
    # result3 = service.upsert_case(case1)
    # print("Upserted case 3 (duplicate):", result3.id)

    # # Confirm chaining
    # print("Case 2 previous:", result2.previous)
    # print("Case 2 sequence:", result2.sequence)


if __name__ == "__main__":
    main()
