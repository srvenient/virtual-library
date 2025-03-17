from typing import Any

from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError
from starlette import status

from app.api.deps import SessionDep
from app.api.student.models.student_models import StudentPublic, StudentCreate
from app.api.student.repository import student_crud

router = APIRouter(tags=["student"])


@router.post("/student/create", response_model=StudentPublic)
def create_student(student_in: StudentCreate, session: SessionDep) -> Any:
    """
    Register a new student
    """
    student = student_crud.get_student_by_email(session=session, email=str(student_in.email))
    if student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The student with this email already exists in the system"
        )

    try:
        student = student_crud.create_student(session=session, student_create=student_in)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the student"
        )

    return student
