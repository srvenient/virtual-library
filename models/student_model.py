from sqlmodel import Field, SQLModel


class Student(SQLModel, table=True):
    email: str | None = Field(default=None, primary_key=True)
    full_name: str = Field(index=True)
    phone_number: str | None = Field(default=None)
    accepted_terms: bool = Field(default=False)
    disabled: bool = Field(default=False)
    password: str = Field(nullable=False)