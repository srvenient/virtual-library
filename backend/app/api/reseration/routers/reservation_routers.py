from typing import Any
from fastapi import APIRouter, HTTPException, Query
from starlette import status

from app.api.deps import SessionDep
from app.api.reservation.models.reservation_models import (
    ReservationCreate, ReservationPublic, ReservationsPublic
)
from app.api.reservation.repository import reservation_crud

router = APIRouter(tags=["reservation"], prefix="/reservations")


@router.post("", response_model=ReservationPublic, status_code=status.HTTP_201_CREATED)
def create_reservation(reservation_in: ReservationCreate, session: SessionDep) -> Any:
    """
    Create a new reservation for a book.
    """
    try:
        return reservation_crud.create_reservation(session=session, reservation_data=reservation_in)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=ReservationsPublic)
def get_all_reservations(
        session: SessionDep,
        page: int = Query(1, ge=1),
        limit: int = Query(10, ge=1)
) -> Any:
    """
    Get a paginated list of all reservations.
    """
    try:
        return reservation_crud.get_all_reservations(session=session, page=page, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{reservation_id}", response_model=ReservationPublic)
def get_reservation_by_id(reservation_id: int, session: SessionDep) -> Any:
    """
    Get a single reservation by ID.
    """
    return reservation_crud.get_reservation_by_id(session=session, reservation_id=reservation_id)


@router.delete("/{reservation_id}", status_code=200)
def cancel_reservation(reservation_id: int, session: SessionDep):
    """
    Cancel a reservation and mark the book as available.
    """
    return reservation_crud.cancel_reservation(session=session, reservation_id=reservation_id)
