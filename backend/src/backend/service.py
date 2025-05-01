# From gotaglio-web/backend, run with python -m src.backend.service

from hashlib import blake2b
import json
from sqlalchemy import create_engine
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
        if id != original.id:
            # This is a new version. Update provenance and compute
            # new hash.
            result["previous"] = original.id
            result["sequence"] = original.sequence + 1
            result["id"] = hash_case(result)

    return Case(**result)

    # if (id == original.id):
    #     # Change was only to mutable fields,
    #     # so no need to create a new version.
    #     result = dict(original)
    #     result["mutable_fields"] = edited["mutable_fields"]
    # else:
    #     # TODO: BUGBUG: what if caller changes only sequence
    #     # or previous, triggering a new version. Then this code
    #     # will create a new version that has no real change.
    #     # Mutable fields were changed.
    #     # Need to create a new version.
    #     result = dict(original)

    #     # Update fields related to the new version.
    #     result["previous"] = original["id"]
    #     result["sequence"] = original["sequence"] + 1

    #     # Update fields that may have been edited.
    #     result["mutable_fields"] = edited["mutable_fields"]
    #     result["immutable_fields"] = edited["immutable_fields"]

    #     # Don't update `basis` and `creator`. These fields are
    #     # truely immutable.

    #     # Recompute the hash to include the new `previous` and
    #     # `sequence` values.
    #     id = hash_case(result)
    #     result["id"] = id
    # return result


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

        # def upsert_multiple_cases(self, edited_cases: List[CaseCreate]) -> List[Case]:
        ids = {c.id for c in edited_cases if c.id is not None}
        original_cases = self.db.query(Case).filter(Case.id.in_(ids)).all()
        original_map = {case.id: case for case in original_cases}
        updated_cases: List[Case] = []
        for edited in edited_cases:
            original = original_map.get(edited.id)
            if not original:
                print(f"No case with id {edited.id}")
                # raise ValueError(f'No case with id {edited.id}')
            updated = process_case(original, edited)
            self.db.add(updated)
            updated_cases.append(updated)
        self.db.commit()
        return updated_cases

    # def upsert_batch(self, case_data_list: List[CaseCreate]) -> List[Case]:
    #     # Preload all required previous cases
    #     prev_ids = {c.previous for c in case_data_list if c.previous}
    #     prev_map = {}
    #     if prev_ids:
    #         prev_cases = self.db.query(Case).filter(Case.id.in_(prev_ids)).all()
    #         prev_map = {case.id: case for case in prev_cases}

    #     inserted_cases: List[Case] = []

    #     for data in case_data_list:
    #         prev = prev_map.get(data.previous)
    #         sequence = (prev.sequence + 1) if prev else 1

    #         new_id = compute_hash(
    #             data.immutable_fields,
    #             data.previous,
    #             data.basis,
    #             data.creator,
    #         )
    #         # NOTE:
    #         # In the vanishingly rare event of a BLAKE2b collision,
    #         # this code would insert a new record whose content differs from
    #         # an existing record with the same ID.
    #         #
    #         # To detect such collisions, you could compare the content of the new
    #         # record with the existing one before insertion:
    #         #
    #         #     existing = db.query(Case).get(new_id)
    #         #     if existing and (existing.immutable_fields != data.immutable_fields or ...):
    #         #         raise RuntimeError("Hash collision detected")
    #         #
    #         # However, BLAKE2b collisions are considered computationally infeasible.
    #         # This check is omitted in production for performance and simplicity.

    #         existing = self.db.get(Case, new_id)
    #         if existing:
    #             inserted_cases.append(existing)
    #             continue

    #         new_case = Case(
    #             id=new_id,
    #             previous=data.previous,
    #             basis=data.basis,
    #             creator=data.creator,
    #             sequence=sequence,
    #             mutable_fields=data.mutable_fields,
    #             immutable_fields=data.immutable_fields,
    #         )
    #         self.db.add(new_case)
    #         inserted_cases.append(new_case)

    #     self.db.commit()
    #     for case in inserted_cases:
    #         self.db.refresh(case)

    #     return inserted_cases


def main():
    # Setup in-memory SQLite
    engine = create_engine("sqlite:///:memory:", echo=False, future=True)
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    service = CaseService(db)

    # Create a new case (first version)
    case1 = CaseCreate(
        # previous=None,
        # basis=None,
        basis=None,
        creator="run-1",
        mutable_fields={"title": "Example case"},
        immutable_fields={"input": "User said hello", "expected": "Hi there!"},
    )
    result1 = service.upsert_case(case1)
    print("Created case 1:", result1.id)

    case2 = CaseUpdate(
        id=result1.id,
        mutable_fields=result1.mutable_fields,
        immutable_fields={"input": "User text changed", "expected": "Hi there!"},
    )
    # result1.basis = 'hi'
    # result1.immutable_fields["input"] = "hi"
    result2 = service.upsert_case(case2)
    print("Updated case 1:", result2.id)

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
