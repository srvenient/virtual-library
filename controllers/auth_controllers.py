from datetime import timedelta
from typing import Optional, Annotated, Any

from fastapi import HTTPException, status, APIRouter, Depends, Response
from jwt import InvalidTokenError
from sqlalchemy.exc import IntegrityError

from db import SessionDep
from libs.jwt import get_password_hash, verify_password, Token, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, \
    oauth2_scheme, TokenData, decode_access_token
from models.student_model import Student

router = APIRouter(
    prefix="/api",
    tags=["api"],
    responses={404: {"description": "Not found"}}
)


def get_student_by_email(email: str, session: SessionDep) -> Optional[Student]:
    return session.query(Student).filter(Student.email == email).first()


async def get_current_student(token: Annotated[str, Depends(oauth2_scheme)], session: SessionDep):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = decode_access_token(token)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    student = get_student_by_email(email=token_data.username, session=session)
    if student is None:
        raise credentials_exception
    return student


@router.get("/auth/verify-token")
async def verify_token(token: Annotated[str, Depends(oauth2_scheme)], session: SessionDep) -> Any:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No access token provided"
        )
    if token.startswith("Bearer "):
        token = token[len("Bearer "):]
    student = get_student_by_email(email=token, session=session)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    return student


@router.post("/register", response_model=Student)
async def register(student_create: Student, session: SessionDep):
    existing_student = get_student_by_email(student_create.email, session)

    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A student with this email already exists"
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
            detail="An error occurred while trying to create the student"
        )

    return new_student


@router.post("/login", response_model=Token)
async def login_for_access_token(student_login: Student, session: SessionDep, response: Response) -> Token:
    student = get_student_by_email(student_login.email, session)

    if not student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se encontró un estudiante con este correo electrónico"
        )

    if not verify_password(student_login.password, student.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Contraseña incorrecta"
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": student.email},
        expires_delta=access_token_expires
    )

    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="none",
        secure=True
    )

    return Token(access_token=access_token, token_type="bearer")
