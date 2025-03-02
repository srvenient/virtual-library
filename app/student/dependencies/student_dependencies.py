from app.student.repositories.sql_user_repository import StudentRepository
from config.database import SessionDep


def get_student_repository(session: SessionDep) -> StudentRepository:
    return StudentRepository(session)
