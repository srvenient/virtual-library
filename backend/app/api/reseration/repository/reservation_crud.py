from fastapi import HTTPException
from sqlmodel import Session, select
from sqlalchemy import func
from datetime import date
from app.api.reservation.models.reservation_models import (
    Reservation, ReservationCreate, ReservationPublic, ReservationsPublic
)
from app.api.book.models.book_models import Book


def create_reservation(session: Session, reservation_data: ReservationCreate) -> ReservationPublic:
    resource = None
    if reservation_data.resource_type == 'book':
        resource = session.get(Book, reservation_data.resource_id)
    elif reservation_data.resource_type == 'room':
        resource = session.get(Room, reservation_data.resource_id)
    elif reservation_data.resource_type == 'computer':
        resource = session.get(Computer, reservation_data.resource_id)
    else:
        raise HTTPException(status_code=400, detail="Invalid resource type")

    if not resource:
        raise HTTPException(status_code=404, detail=f"{reservation_data.resource_type.capitalize()} not found")

    if not getattr(resource, 'is_available', True):
        raise HTTPException(status_code=400,
                            detail=f"{reservation_data.resource_type.capitalize()} is not available for reservation")

    existing_reservation = session.exec(
        select(Reservation).where(
            Reservation.resource_type == reservation_data.resource_type,
            Reservation.resource_id == reservation_data.resource_id,
            Reservation.user_id == reservation_data.user_id
        )
    ).first()

    if existing_reservation:
        raise HTTPException(status_code=400, detail="User has already reserved this resource")

    reservation = Reservation(**reservation_data.dict())

    resource.is_available = False
    session.add(resource)
    session.add(reservation)
    session.commit()
    session.refresh(reservation)

    return ReservationPublic(**reservation.dict())


def cancel_reservation(session: Session, reservation_id: int):
    reservation = session.get(Reservation, reservation_id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    resource = None
    if reservation.resource_type == 'book':
        resource = session.get(Book, reservation.resource_id)
    elif reservation.resource_type == 'room':
        resource = session.get(Room, reservation.resource_id)
    elif reservation.resource_type == 'computer':
        resource = session.get(Computer, reservation.resource_id)
    else:
        raise HTTPException(status_code=400, detail="Invalid resource type in reservation")

    if resource:
        resource.is_available = True
        session.add(resource)

    session.delete(reservation)
    session.commit()

    return {"detail": f"Reservation cancelled and {reservation.resource_type} marked as available"}
