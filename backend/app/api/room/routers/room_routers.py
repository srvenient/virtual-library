from typing import Any

from fastapi import APIRouter, Query
from starlette import status

from app.api.deps import SessionDep
from app.api.room.models.room_models import RoomCreate, RoomPublic, RoomsPublic
from app.api.room.repository import room_crud

router = APIRouter(tags=["room"], prefix="/rooms")


@router.post("", response_model=RoomPublic, status_code=status.HTTP_201_CREATED)
def create_room(room_in: RoomCreate, session: SessionDep) -> Any:
    """
    Create a new room in the system.
    """
    return room_crud.create_room(session=session, room_data=room_in)


@router.get("", response_model=RoomsPublic)
def get_all_rooms(
    session: SessionDep,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1)
) -> Any:
    """
    Get a paginated list of all rooms.
    """
    return room_crud.get_all_rooms(session=session, page=page, limit=limit)


@router.get("/{room_id}", response_model=RoomPublic)
def get_room(room_id: int, session: SessionDep) -> Any:
    """
    Get a single room by its ID.
    """
    return room_crud.get_room(session=session, room_id=room_id)


@router.put("/{room_id}", response_model=RoomPublic)
def update_room(room_id: int, room_in: RoomCreate, session: SessionDep) -> Any:
    """
    Update a room's information.
    """
    return room_crud.update_room(session=session, room_id=room_id, new_data=room_in)


@router.delete("/{room_id}", response_model=RoomPublic)
def delete_room(room_id: int, session: SessionDep) -> Any:
    """
    Delete a room.
    """
    return room_crud.delete_room(session=session, room_id=room_id)
