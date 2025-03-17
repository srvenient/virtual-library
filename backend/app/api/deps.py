from typing import Generator, Annotated, Type, Optional

import jwt
from fastapi import Depends, HTTPException
from fastapi.params import Cookie
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session
from starlette import status

from app.api.auth.models.token_models import TokenPayload
from app.api.student.models.student_models import Student
from app.core.config import settings
from app.core.db import engine
from app.core.security import ALGORITHM


def get_token_from_cookie(access_token: Optional[str] = Cookie(None)) -> str:
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    return access_token


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]


def get_current_student(session: SessionDep, token: Annotated[str, Depends(get_token_from_cookie)]) -> Type[Student]:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except(InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials"
        )
    student = session.get(Student, token_data.sub)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    if student.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive student"
        )
    return student


CurrentStudent = Annotated[Student, Depends(get_current_student)]
