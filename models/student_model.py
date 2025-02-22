from sqlmodel import Field, SQLModel
from typing import Optional


class Student(SQLModel, table=True):
    """
    Student model representing a registered user.

    Attributes:
        email (str): Primary key. Email of the student.
        full_name (str): Full name of the student.
        phone_number (Optional[str]): Contact phone number.
        accepted_terms (bool): Whether the student has accepted the terms.
        disabled (bool): Indicates if the student's account is disabled.
        password (str): Hashed password for authentication.
    """
    email: str = Field(primary_key=True, index=True)
    full_name: str = Field(index=True)
    phone_number: Optional[str] = Field(default=None)
    accepted_terms: bool = Field(default=False)
    disabled: bool = Field(default=False)
    password: str = Field(nullable=False)


class StudentPublic(SQLModel):
    """
    Public representation of a student.

    This model excludes sensitive fields like the password.

    Attributes:
        email (str): Email of the student.
        full_name (str): Full name of the student.
        phone_number (Optional[str]): Contact phone number.
        disabled (bool): Indicates if the student's account is disabled.
    """
    email: str
    full_name: str
    phone_number: Optional[str]
    disabled: bool
