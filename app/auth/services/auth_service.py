from datetime import timedelta

from fastapi import HTTPException, Response, status, Depends
from sqlalchemy.exc import IntegrityError

from app.auth.libs.jwt import get_password_hash, verify_password, create_access_token
from app.auth.schemas.auth_schemas import Token
from app.student.dependencies.student_dependencies import get_student_repository
from app.student.models.student_model import Student
from app.student.repositories.sql_user_repository import StudentRepository
from app.config.env_variables import ACCESS_TOKEN_EXPIRE_MINUTES


def register_student(student_create: Student, student_repository: StudentRepository = Depends(get_student_repository)) -> Student:
    existing_student = student_repository.get_by_email(student_create.email)
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
        accepted_terms=student_create.accepted_terms,
        disabled=student_create.disabled,
        password=hashed_password,
    )

    try:
        new_student = student_repository.create(new_student)
    except IntegrityError:
        student_repository.session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while trying to create the student",
        )

    return new_student


def login_for_access_token(student_login: Student, response: Response, student_repository: StudentRepository = Depends(get_student_repository)) -> Token:
    student = student_repository.get_by_email(student_login.email)
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
    access_token = create_access_token(data={"sub": student.email}, expires_delta=access_token_expires, )

    # Set the access token as a secure, HTTP-only cookie
    response.set_cookie(
        key="token",
        value=access_token,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

    return Token(access_token=access_token, token_type="bearer")
