from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import func
from sqlmodel import Session, select

from app.api.room.models.room_models import Room, RoomCreate, RoomPublic, RoomsPublic


def create_room(*, session: Session, room_data: RoomCreate) -> RoomPublic:
    room = Room.model_validate(room_data)
    session.add(room)
    session.commit()
    session.refresh(room)
    return RoomPublic.model_validate(room)


def get_all_rooms(*, session: Session, page: int = 1, limit: int = 10) -> RoomsPublic:
    offset = (page - 1) * limit
    total = session.exec(select(func.count()).select_from(Room)).one()
    rooms = session.exec(select(Room).offset(offset).limit(limit)).all()
    return RoomsPublic(
        data=[RoomPublic.model_validate(r) for r in rooms],
        count=total
    )


def get_room_by_number(*, session: Session, room_number: str) -> RoomPublic | None:
    statement = select(Room).where(Room.room_number == room_number)
    room = session.exec(statement).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return RoomPublic.model_validate(room)


def get_room(*, session: Session, room_id: int) -> RoomPublic | None:
    room = session.get(Room, room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return RoomPublic.model_validate(room)


def update_room(*, session: Session, room_id: int, new_data: RoomCreate) -> RoomPublic:
    room = session.get(Room, room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    for field, value in new_data.model_dump(exclude_unset=True).items():
        setattr(room, field, value)

    session.commit()
    session.refresh(room)
    return RoomPublic.model_validate(room)


def delete_room(*, session: Session, room_id: int) -> RoomPublic:
    room = session.get(Room, room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    session.delete(room)
    session.commit()
    return RoomPublic.model_validate(room)
