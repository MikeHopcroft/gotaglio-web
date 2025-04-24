# import os
# import sys

# # Add the parent directory to the sys.path so that we can import from the
# # gotaglio package, as if it had been installed.
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# From gotaglio-web/backend, run with python -m src.backend.service

# service.py
from hashlib import blake2b
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from .models import Base, Case
from .schemas import CaseCreate, CaseRead
from typing import List, Optional


def compute_hash(immutable_fields: dict, previous: Optional[str], basis: Optional[str], creator: str) -> str:
    h = blake2b(digest_size=32)
    combined = {
        "immutable_fields": immutable_fields,
        "previous": previous,
        "basis": basis,
        "creator": creator,
    }
    h.update(json.dumps(combined, sort_keys=True).encode('utf-8'))
    return h.hexdigest()

class CaseService:
    def __init__(self, db: Session):
        self.db = db

    def upsert_case(self, case_data: CaseCreate) -> Case:
        return self.upsert_batch([case_data])[0]

# service.py (continued)

    def upsert_batch(self, case_data_list: List[CaseCreate]) -> List[Case]:
        # 1. Collect all needed `previous` IDs
        prev_ids = {c.previous for c in case_data_list if c.previous}
        prev_map = {}
        if prev_ids:
            prev_cases = self.db.query(Case).filter(Case.id.in_(prev_ids)).all()
            prev_map = {case.id: case for case in prev_cases}

        inserted_cases = []

        for data in case_data_list:
            prev = prev_map.get(data.previous)
            if data.previous and not prev:
                raise ValueError(f"Previous case {data.previous} not found")

            sequence = (prev.sequence + 1) if prev else 1

            new_id = compute_hash(
                data.immutable_fields,
                data.previous,
                data.basis,
                data.creator,
            )

            # NOTE:
            # In the vanishingly rare event of a BLAKE2b collision,
            # this code would insert a new record whose content differs from
            # an existing record with the same ID.
            #
            # To detect such collisions, you could compare the content of the new
            # record with the existing one before insertion:
            #
            #     existing = db.query(Case).get(new_id)
            #     if existing and (existing.immutable_fields != data.immutable_fields or ...):
            #         raise RuntimeError("Hash collision detected")
            #
            # However, BLAKE2b collisions are considered computationally infeasible.
            # This check is omitted in production for performance and simplicity.


            # existing = self.db.query(Case).get(new_id) # 🚨 deprecated
            existing = self.db.get(Case, new_id)  # ✅ modern SQLAlchemy 2.0 syntax
            if existing:
                inserted_cases.append(existing)
                continue

            case = Case(
                id=new_id,
                previous=data.previous,
                sequence=sequence,
                basis=data.basis,
                creator=data.creator,
                mutable_fields=data.mutable_fields,
                immutable_fields=data.immutable_fields,
            )

            self.db.add(case)
            inserted_cases.append(case)

        self.db.commit()
        for case in inserted_cases:
            self.db.refresh(case)

        return inserted_cases

def main():
    # Setup in-memory SQLite
    engine = create_engine("sqlite:///:memory:", echo=False, future=True)
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    service = CaseService(db)

    # Upsert a new case (first version)
    case1 = CaseCreate(
        previous=None,
        basis=None,
        creator="run-1",
        mutable_fields={"title": "Example case"},
        immutable_fields={"input": "User said hello", "expected": "Hi there!"}
    )
    result1 = service.upsert_case(case1)
    print("Upserted case 1:", result1.id)

    # Upsert a modified version (edit)
    case2 = CaseCreate(
        previous=result1.id,
        basis=None,
        creator="run-1",
        mutable_fields={"title": "Updated case"},
        immutable_fields={"input": "User said hello", "expected": "Hi there!"}
    )
    result2 = service.upsert_case(case2)
    print("Upserted case 2:", result2.id)

    # Upsert an identical case (should return existing)
    result3 = service.upsert_case(case1)
    print("Upserted case 3 (duplicate):", result3.id)

    # Confirm chaining
    print("Case 2 previous:", result2.previous)
    print("Case 2 sequence:", result2.sequence)

if __name__ == "__main__":
    main()
