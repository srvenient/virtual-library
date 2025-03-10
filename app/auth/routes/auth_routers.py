from fastapi import APIRouter, Depends, Response, status

from app.auth.dependencies.auth_dependencies import get_current_active_student
from app.auth.schemas.auth_schemas import Token
from app.auth.services.auth_service import login_for_access_token, register_student
from app.student.dependencies.student_dependencies import get_student_repository
from app.student.models.student_model import Student
from app.student.repositories.sql_user_repository import StudentRepository

router = APIRouter(
    prefix="/api",
    tags=["api"],
    responses={404: {"description": "Not found"}}
)


@router.post("/register", response_model=Student, status_code=status.HTTP_201_CREATED)
async def register(student_create: Student,
                   student_repository: StudentRepository = Depends(get_student_repository)) -> Student:
    return register_student(student_create, student_repository)


@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login(
        student_login: Student,
        response: Response,
        student_repository: StudentRepository = Depends(get_student_repository)
) -> Token:
    return login_for_access_token(student_login, response, student_repository)


@router.get("/auth/me", response_model=Student, status_code=status.HTTP_200_OK, response_model_exclude={"password"})
async def verify_token(
        current_student: Student = Depends(get_current_active_student)
) -> Student:
    return current_student
