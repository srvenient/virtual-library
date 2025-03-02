from typing import Optional, Annotated

from fastapi import Depends, HTTPException, status, Cookie
from jwt import InvalidTokenError

from app.auth.libs.jwt import decode_access_token
from app.auth.schemas.auth_schemas import TokenData
from app.student.dependencies.student_dependencies import get_student_repository
from app.student.models.student_model import Student
from app.student.repositories.sql_user_repository import StudentRepository


async def get_current_student(
        token: Annotated[Optional[str], Cookie()],
        student_repository: StudentRepository = Depends(get_student_repository)
) -> Student:
    """
    Dependency that retrieves the current student based on the provided token.
    The token is expected to be passed in a cookie.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Could not validate credentials",
    )

    if token is None:
        raise credentials_exception

    # Remove the "Bearer " prefix if present
    if token.startswith("Bearer "):
        token = token[len("Bearer "):]

    try:
        payload = decode_access_token(token)
        username: Optional[str] = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception

    student = student_repository.get_by_email(email=token_data.username)
    if student is None:
        raise credentials_exception

    return student


async def get_current_active_student(
        current_student: Student = Depends(get_current_student)
) -> Student:
    """
    Dependency that ensures the current student is active.
    """
    if current_student.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive student")
    return current_student
