from fastapi import APIRouter

from app.api.auth.routers import auth_routers
from app.api.student.routers import student_routers
from app.api.book.routers import book_routers
from app.api.room.routers import room_routers
from app.api.computer.routers import computer_routers
from app.api.reservation import reservation_router

api_router = APIRouter()
api_router.include_router(auth_routers.router, tags=["auth"])
api_router.include_router(student_routers.router, tags=["student"])
api_router.include_router(book_routers.router, tags=["book"])
api_router.include_router(room_routers.router)
api_router.include_router(computer_routers.router)
api_router.include_router(reservation_router, tags=["reservation"])
