# app/api/reservation/models.py
from datetime import datetime, date, time
from sqlmodel import SQLModel, Field, ForeignKey


class Reservation(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    resource_type: str
    resource_id: int

    student_id: int = Field(foreign_key="student.id")

    start_date: date
    start_time: time
    return_date: date
    return_time: time

    reservation_date: datetime = Field(default_factory=datetime.utcnow)


