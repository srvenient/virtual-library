# app/api/reservation/schemas.py
from pydantic import BaseModel
from datetime import date, time, datetime


class ReservationCreate(BaseModel):
    resource_type: str
    resource_id: int
    start_date: date
    start_time: time
    return_date: date
    return_time: time


class ReservationPublic(ReservationCreate):
    id: int
    student_id: int
    reservation_date: datetime

    class Config:
        from_attributes = True


