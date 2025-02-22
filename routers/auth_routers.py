from datetime import timedelta
from typing import Annotated, Optional

from fastapi import HTTPException, status, APIRouter, Depends, Response, Cookie
from jwt import InvalidTokenError
from sqlalchemy.exc import IntegrityError

from db import SessionDep
from libs.jwt import (
    get_password_hash,
    verify_password,
    Token,
    create_access_token,
    TokenData,
    decode_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)
from models.student_model import Student, StudentPublic

router = APIRouter(
    prefix="/api",
    tags=["api"],
    responses={404: {"description": "Not found"}}
)


def get_student_by_email(email: str, session: SessionDep) -> Optional[Student]:
    """
    Retrieve a student by email from the database.
    """
    return session.query(Student).filter(Student.email == email).first()


async def get_current_student(
        token: Annotated[Optional[str], Cookie()],
        session: SessionDep
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

    student = get_student_by_email(email=token_data.username, session=session)
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


@router.get("/auth/verify-token", response_model=StudentPublic)
async def verify_token(
        current_student: Student = Depends(get_current_active_student)
) -> StudentPublic:
    """
    Endpoint to verify the access token and return public student information.
    """
    return StudentPublic(
        full_name=current_student.full_name,
        email=current_student.email,
        phone_number=current_student.phone_number,
        disabled=current_student.disabled
    )


@router.post("/register", response_model=Student)
async def register(student_create: Student, session: SessionDep) -> Student:
    """
    Endpoint to register a new student. Returns the created student object.
    """
    existing_student = get_student_by_email(student_create.email, session)
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A student with this email already exists",
        )

    hashed_password = get_password_hash(student_create.password)

    new_student = Student(
        full_name=student_create.full_name,
        email=student_create.email,
        phone_number=student_create.phone_number,
        disabled=student_create.disabled,
        password=hashed_password,
    )

    try:
        session.add(new_student)
        session.commit()
        session.refresh(new_student)
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while trying to create the student",
        )

    return new_student


@router.post("/login", response_model=Token)
async def login_for_access_token(
        student_login: Student,
        response: Response,
        session: SessionDep
) -> Token:
    """
    Endpoint to log in a student. Validates credentials and returns an access token.
    Also sets the token in a secure cookie.
    """
    student = get_student_by_email(student_login.email, session)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No student found with this email",
        )

    if not verify_password(student_login.password, student.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password",
        )

    # Create the access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": student.email},
        expires_delta=access_token_expires,
    )

    # Set the access token as a secure, HTTP-only cookie
    response.set_cookie(
        key="token",
        value=access_token,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

    return Token(access_token=access_token, token_type="bearer")
