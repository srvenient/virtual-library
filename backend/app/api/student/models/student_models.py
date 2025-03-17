from typing import Optional

from pydantic import EmailStr
from sqlmodel import SQLModel, Field


class StudentBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    full_name: str | None = Field(default=None, max_length=255)
    phone_number: str | None = Field(default=None, max_length=20)
    accepted_terms: bool = False
    disabled: bool = False


class StudentCreate(StudentBase):
    password: str = Field(min_length=8, max_length=40)


class StudentRegister(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr = Field(max_length=255)
    phone_number: str | None = Field(default=None, max_length=20)
    password: str = Field(min_length=8, max_length=40)
    accepted_terms: bool


class Student(StudentBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str


class StudentPublic(StudentBase):
    id: int


class StudentsPublic(SQLModel):
    data: list[StudentPublic]
    count: int
