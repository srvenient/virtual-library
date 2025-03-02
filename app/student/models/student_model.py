import uuid
from sqlmodel import Field, SQLModel
from typing import Optional


class Student(SQLModel, table=True):
    """
    Student model representing a registered user.

    Attributes:
        id (UUID): Primary key. Automatically generated UUID.
        email (str): Unique email of the student.
        full_name (str): Full name of the student.
        phone_number (Optional[str]): Contact phone number.
        accepted_terms (bool): Whether the student has accepted the terms.
        disabled (bool): Indicates if the student's account is disabled.
        password (str): Hashed password for authentication.
    """
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    full_name: str = Field(index=True, max_length=100)
    email: str = Field(unique=True, index=True, max_length=255)
    phone_number: Optional[str] = Field(default=None, max_length=10)
    accepted_terms: bool = Field(default=False)
    disabled: bool = Field(default=False)
    password: str = Field(nullable=False, exclude=True)
