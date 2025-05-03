# schemas.py
from pydantic import BaseModel
from typing import Optional, Dict, Any

class CaseBase(BaseModel):
    mutable_fields: Dict[str, Any]
    versioned_fields: Dict[str, Any]

class CaseCreate(CaseBase):
    creator: str
    basis: Optional[str]
    creator: str  # Required for new creation

class CaseUpdate(CaseBase):
    id: str | None  

    class Config:
        from_attributes = True # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2


class CaseRead(CaseBase):
    id: str
    sequence: int
    basis: Optional[str]
    creator: str
    previous: Optional[str]

    class Config:
        from_attributes = True # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2
