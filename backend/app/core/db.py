from sqlmodel import create_engine, SQLModel

from app.core.config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def init_db() -> None:
    from app.api.student.models.student_models import Student

    SQLModel.metadata.create_all(engine)
