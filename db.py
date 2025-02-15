from typing import Annotated

from fastapi import Depends
from sqlmodel import create_engine, SQLModel, Session

sql_url = "postgresql://library_owner:lMAeU3JvuGB4@ep-cool-mode-a53izner-pooler.us-east-2.aws.neon.tech/library?sslmode=require"

engine = create_engine(sql_url, echo=True)  # Puedes dejar `echo=True` para ver las consultas en consola


def create_db_and_tables():
    from models.student_model import Student
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
