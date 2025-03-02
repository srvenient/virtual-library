import uuid
from abc import ABC
from typing import Type

from sqlalchemy.orm import Session
from sqlmodel import select

from app.core.repositories.crud_repository import CrudRepository, T
from app.student.models.student_model import Student


class StudentRepository(CrudRepository[Student, uuid.UUID], ABC):
    def __init__(self, session: Session):
        super().__init__(Student)
        self.session = session

    def get(self, identifier: uuid.UUID) -> Student | None:
        return self.session.get(self.model, identifier)

    def get_by_email(self, email: str) -> Student | None:
        return (self.session.execute(select(self.model).where(self.model.email == email))
                .scalars()
                .first())

    def get_all(self) -> list[Type[Student]]:
        return self.session.query(self.model).all()

    def create(self, obj_in: dict) -> Student:
        obj = self.model(**obj_in)
        self.session.add(obj)
        self.session.flush()
        self.session.commit()
        self.session.refresh(obj)
        return obj

    def update(self, obj: Student, obj_in: dict) -> Student:
        for field in obj_in:
            setattr(obj, field, getattr(obj_in, field))
        self.session.commit()
        return obj

    def delete(self, obj: T):
        self.session.delete(obj)

