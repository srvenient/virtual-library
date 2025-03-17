from datetime import timedelta
from http.client import responses
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status

from app.api.auth.models.token_models import Token
from app.api.deps import SessionDep, CurrentStudent
from app.api.student.repository import student_crud
from app.core import security
from app.core.config import settings

router = APIRouter(tags=["auth"])


@router.post("/login/access-token")
def login_access_token(
        session: SessionDep, response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    student = student_crud.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    if student.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive student"
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        student.id, expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return Token(access_token=access_token)

@router.get("/auth/me")
def verify_token(student: CurrentStudent):
    return student