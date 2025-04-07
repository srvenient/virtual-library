from fastapi import APIRouter

from app.api.auth.routers import auth_routers
from app.api.student.routers import student_routers
from app.api.book.routers import book_routers

api_router = APIRouter()
api_router.include_router(auth_routers.router, tags=["auth"])
api_router.include_router(student_routers.router, tags=["student"])
api_router.include_router(book_routers.router, tags=["book"])