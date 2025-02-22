from typing import Annotated

from fastapi import Depends
from sqlmodel import create_engine, SQLModel, Session

sql_url = "postgresql://library_owner:npg_jLdbhi7x1Ycv@ep-withered-fog-a8jq1uxt-pooler.eastus2.azure.neon.tech/library?sslmode=require"

engine = create_engine(sql_url, echo=True)


def create_db_and_tables():
    """
    Create all tables defined in the models.
    Imports the student model to include it in the metadata.
    """
    SQLModel.metadata.create_all(engine)


def get_session():
    """
    Dependency for obtaining a database session.
    This function opens a session and ensures it is closed after use.
    """
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
