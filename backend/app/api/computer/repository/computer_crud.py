from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import func
from sqlmodel import Session, select

from app.api.computer.models.computer_models import Computer, ComputerCreate, ComputerPublic, ComputersPublic


def create_computer(*, session: Session, computer_data: ComputerCreate) -> ComputerPublic:
    computer = Computer.model_validate(computer_data)
    session.add(computer)
    session.commit()
    session.refresh(computer)
    return ComputerPublic.model_validate(computer)


def get_all_computers(*, session: Session, page: int = 1, limit: int = 10) -> ComputersPublic:
    offset = (page - 1) * limit
    total = session.exec(select(func.count()).select_from(Computer)).one()
    computers = session.exec(select(Computer).offset(offset).limit(limit)).all()
    return ComputersPublic(
        data=[ComputerPublic.model_validate(c) for c in computers],
        count=total
    )


def get_computer_by_serial(*, session: Session, serial_number: str) -> ComputerPublic | None:
    statement = select(Computer).where(Computer.serial_number == serial_number)
    computer = session.exec(statement).first()
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")
    return ComputerPublic.model_validate(computer)


def get_computer(*, session: Session, computer_id: int) -> ComputerPublic | None:
    computer = session.get(Computer, computer_id)
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")
    return ComputerPublic.model_validate(computer)


def update_computer(*, session: Session, computer_id: int, new_data: ComputerCreate) -> ComputerPublic:
    computer = session.get(Computer, computer_id)
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")

    for field, value in new_data.model_dump(exclude_unset=True).items():
        setattr(computer, field, value)

    session.commit()
    session.refresh(computer)
    return ComputerPublic.model_validate(computer)


def delete_computer(*, session: Session, computer_id: int) -> ComputerPublic:
    computer = session.get(Computer, computer_id)
    if not computer:
        raise HTTPException(status_code=404, detail="Computer not found")
    
    session.delete(computer)
    session.commit()
    return ComputerPublic.model_validate(computer)
