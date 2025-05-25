from typing import Literal, Optional
from datetime import date
from sqlmodel import SQLModel, Field


class ReservationBase(SQLModel):
    user_id: int
    resource_type: Literal['book', 'room', 'computer']
    resource_id: int
    reservation_date: Optional[date] = Field(default_factory=date.today)
    due_date: Optional[date] = None


class ReservationCreate(ReservationBase):
    pass


class Reservation(ReservationBase, table=True):
    id: int = Field(default=None, primary_key=True)


class ReservationPublic(ReservationBase):
    id: int


class ReservationsPublic(SQLModel):
    data: list[ReservationPublic]
    count: int
