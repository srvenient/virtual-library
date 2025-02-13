from pydantic import BaseModel


class Student(BaseModel):
    full_name: str | None = None
    email: str
    phone_number: str | None = None
    disabled: bool | None = None


class StudentInDB(Student):
    hashed_password: str