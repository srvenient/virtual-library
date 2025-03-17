from __future__ import annotations

from sqlmodel import Session, select

from app.api.student.models.student_models import StudentCreate, Student
from app.core.security import get_password_hash, verify_password


def create_student(*, session: Session, student_create: StudentCreate) -> Student:
    db_obj = Student.model_validate(
        student_create, update={"hashed_password": get_password_hash(student_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def get_student_by_email(*, session: Session, email: str) -> Student | None:
    statement = select(Student).where(Student.email == email)
    session_student = session.exec(statement).first()
    return session_student


def authenticate(*, session: Session, email: str, password: str) -> Student | None:
    db_student = get_student_by_email(session=session, email=email)
    if not db_student:
        return None
    if not verify_password(password, db_student.hashed_password):
        return None
    return db_student
