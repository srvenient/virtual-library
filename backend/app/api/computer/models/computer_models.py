from typing import Optional
from sqlmodel import SQLModel, Field


class ComputerBase(SQLModel):
    serial_number: str = Field(max_length=255, unique=True, index=True)
    brand: str | None = Field(default=None, max_length=255)
    assigned_career: Optional[str] = Field(default=None, max_length=255)
    is_available: bool = Field(default=True)
    location: str | None = Field(default=None, max_length=255)  # Ubicación física del computador
    cover_url: str | None = Field(default=None, max_length=512)


class ComputerCreate(ComputerBase):
    pass


class Computer(ComputerBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ComputerPublic(ComputerBase):
    id: int


class ComputersPublic(SQLModel):
    data: list[ComputerPublic]
    count: int
