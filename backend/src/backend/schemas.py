from pydantic import BaseModel
from typing import Optional, Dict, Any


class JsonFields(BaseModel):
    mutable_fields: Dict[str, Any]
    versioned_fields: Dict[str, Any]


class VersionedBase(BaseModel):
    sequence: int
    previous: Optional[str]


###################################################################
#
# Case
#
###################################################################
class CaseCreate(JsonFields):
    creator: str
    basis: Optional[str]


class CaseUpdate(JsonFields):
    id: str

    class Config:
        from_attributes = True  # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2


class CaseRead(CaseCreate):
    id: str
    sequence: int
    previous: Optional[str]

    class Config:
        from_attributes = True  # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2


###################################################################
#
# Experiment
#
###################################################################
class ExperimentCreate(JsonFields):
    pass


class ExperimentUpdate(JsonFields):
    id: str

    class Config:
        from_attributes = True  # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2


class ExperimentRead(ExperimentCreate):
    id: str
    sequence: int
    previous: Optional[str]

    class Config:
        from_attributes = True  # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2


###################################################################
#
# Run
#
###################################################################
class RunCreate(BaseModel):
    experiment: str
    suite: str
    config: Dict[str, Any]


# There is no class RunUpdate because runs cannot be updated.


class RunRead(RunCreate):
    id: str

    class Config:
        from_attributes = True  # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2


###################################################################
#
# Suite
#
###################################################################
class SuiteCreate(BaseModel):
    mutable_fields: Dict[str, Any]


class SuiteUpdate(SuiteCreate):
    id: str

    class Config:
        from_attributes = True  # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2


class SuiteRead(SuiteCreate):
    id: str

    class Config:
        from_attributes = True  # ✅ Pydantic v2 equivalent
        # orm_mode = True # ❌ Deprecated in Pydantic v2
