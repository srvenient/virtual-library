from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from app.api.reservation.models import Reservation
from app.api.reservation.schemas import ReservationCreate, ReservationPublic
from app.api.deps import SessionDep, CurrentStudent

from app.api.book.models.book_models import Book
from app.api.room.models.room_models import Room
from app.api.computer.models.computer_models import Computer

router = APIRouter(prefix="/reservation", tags=["reservation"])

model_map = {
    "book": Book,
    "room": Room,
    "computer": Computer
}

@router.post("/", response_model=ReservationPublic)
def create_reservation(
    data: ReservationCreate,
    session: SessionDep,
    current_student: CurrentStudent
):
    model = model_map.get(data.resource_type)
    if not model:
        raise HTTPException(status_code=400, detail="Invalid resource type")

    resource = session.get(model, data.resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    if hasattr(resource, "is_available") and not resource.is_available:
        raise HTTPException(status_code=400, detail="Resource not available")

    existing_reservation = session.exec(
        select(Reservation).where(
            Reservation.student_id == current_student.id,
            Reservation.resource_type == data.resource_type
        )
    ).first()

    if existing_reservation:
        raise HTTPException(
            status_code=400,
            detail=f"You already have a reservation for a {data.resource_type}"
        )

    reservation = Reservation(
        **data.model_dump(),
        student_id=current_student.id
    )
    session.add(reservation)

    if hasattr(resource, "is_available"):
        resource.is_available = False

    session.commit()
    session.refresh(reservation)
    return ReservationPublic.model_validate(reservation)


@router.delete("/{reservation_id}", response_model=ReservationPublic)
def cancel_reservation(
    reservation_id: int,
    session: SessionDep,
    current_student: CurrentStudent
):
    reservation = session.get(Reservation, reservation_id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    if reservation.student_id != current_student.id:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this reservation")

    model = model_map.get(reservation.resource_type)
    if not model:
        raise HTTPException(status_code=400, detail="Invalid resource type")

    resource = session.get(model, reservation.resource_id)
    if resource and hasattr(resource, "is_available"):
        resource.is_available = True

    session.delete(reservation)
    session.commit()
    return ReservationPublic.model_validate(reservation)
