# models.py
from sqlalchemy import Column, String, Integer, ForeignKey, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
import sqlalchemy.dialects.postgresql as pg

# Base = declarative_base()
class Base(DeclarativeBase):
    pass


class Case(Base):
    __tablename__ = "cases"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    previous: Mapped[str | None] = mapped_column(ForeignKey("cases.id"), nullable=True)
    sequence: Mapped[int] = mapped_column(Integer)
    basis: Mapped[str | None] = mapped_column(ForeignKey("cases.id"), nullable=True)
    creator: Mapped[str] = mapped_column(String)  # Could be ForeignKey("runs.id")
    mutable_fields: Mapped[dict] = mapped_column(JSON)
    immutable_fields: Mapped[dict] = mapped_column(JSON)

class Run(Base):
    __tablename__ = "runs"

    id: Mapped[str] = mapped_column(String, primary_key=True)  # Use hash, or just a UUID in dev
    # experiment: Mapped[str] = mapped_column(ForeignKey("experiments.id"))  # 👈 Stubbed for now
    # suite: Mapped[str] = mapped_column(ForeignKey("suites.id"))            # 👈 Stubbed for now
    config: Mapped[dict] = mapped_column(JSON, default=dict)