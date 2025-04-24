# schemas.py
from pydantic import BaseModel
from typing import Optional, Dict, Any

class CaseBase(BaseModel):
    mutable_fields: Dict[str, Any]
    immutable_fields: Dict[str, Any]

class CaseCreate(CaseBase):
    previous: Optional[str]
    basis: Optional[str]
    creator: str  # Required for new creation

class CaseRead(CaseBase):
    id: str
    sequence: int
    basis: Optional[str]
    creator: str
    previous: Optional[str]

    class Config:
        from_attributes = True # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2
