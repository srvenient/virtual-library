from datetime import timedelta
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError

from student.models.models import Student
from student.services.auth_service import TokenData, SECRET_KEY, ALGORITHM, Token, ACCESS_TOKEN_EXPIRE_MINUTES, \
    create_access_token
from student.services.student_service import get_student, authenticate_student, fake_students_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(
    prefix="/students",
    tags=["students"],
    responses={404: {"description": "Not found"}}
)


async def get_current_student(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    student = get_student(username=token_data.username)
    if student is None:
        raise credentials_exception
    return student


async def get_current_active_student(current_student: Annotated[Student, Depends(get_current_student)], ):
    if current_student.disabled:
        raise HTTPException(status_code=400, detail="Inactive student")
    return current_student


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    student = authenticate_student(fake_students_db, form_data.username, form_data.password)
    if not student:
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": student.email},
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=Student)
async def read_users_me(current_student: Annotated[Student, Depends(get_current_active_student)]) -> Student:
    return current_student


@router.get("/me/items/")
async def read_own_items(current_student: Annotated[Student, Depends(get_current_active_student)]):
    return [{"item_id": "Foo", "owner": current_student.email}]
