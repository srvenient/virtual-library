from typing import Optional
from sqlmodel import SQLModel, Field


class RoomBase(SQLModel):
    room_number: str = Field(max_length=255, unique=True, index=True)
    image_url: str | None = Field(default=None, max_length=512)
    is_available: bool = Field(default=True)
    campus: str | None = Field(default=None, max_length=255)  # Sede


class RoomCreate(RoomBase):
    pass


class Room(RoomBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class RoomPublic(RoomBase):
    id: int


class RoomsPublic(SQLModel):
    data: list[RoomPublic]
    count: int
