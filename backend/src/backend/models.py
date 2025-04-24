# models.py
from sqlalchemy import Column, String, Integer, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, Mapped, mapped_column
import sqlalchemy.dialects.postgresql as pg

Base = declarative_base()

class Case(Base):
    __tablename__ = 'cases'
    id = Column(String, primary_key=True)  # BLAKE2b hash
    previous = Column(String, ForeignKey('cases.id'), nullable=True)
    sequence = Column(Integer)
    basis = Column(String, ForeignKey('cases.id'), nullable=True)
    creator = Column(String, ForeignKey('runs.id'))
    mutable_fields = Column(JSON)
    immutable_fields = Column(JSON)

class Run(Base):
    __tablename__ = "runs"

    id: Mapped[str] = mapped_column(String, primary_key=True)  # Use hash, or just a UUID in dev
    # experiment: Mapped[str] = mapped_column(ForeignKey("experiments.id"))  # 👈 Stubbed for now
    # suite: Mapped[str] = mapped_column(ForeignKey("suites.id"))            # 👈 Stubbed for now
    config: Mapped[dict] = mapped_column(JSON, default=dict)