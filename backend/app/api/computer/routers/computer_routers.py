from typing import Any

from fastapi import APIRouter, Query
from starlette import status

from app.api.deps import SessionDep
from app.api.computer.models.computer_models import ComputerCreate, ComputerPublic, ComputersPublic
from app.api.computer.repository import computer_crud

router = APIRouter(tags=["computer"], prefix="/computers")


@router.post("", response_model=ComputerPublic, status_code=status.HTTP_201_CREATED)
def create_computer(computer_in: ComputerCreate, session: SessionDep) -> Any:
    """
    Create a new computer in the system.
    """
    return computer_crud.create_computer(session=session, computer_data=computer_in)


@router.get("", response_model=ComputersPublic)
def get_all_computers(
    session: SessionDep,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1)
) -> Any:
    """
    Get a paginated list of all computers.
    """
    return computer_crud.get_all_computers(session=session, page=page, limit=limit)


@router.get("/{computer_id}", response_model=ComputerPublic)
def get_computer(computer_id: int, session: SessionDep) -> Any:
    """
    Get a single computer by its ID.
    """
    return computer_crud.get_computer(session=session, computer_id=computer_id)


@router.put("/{computer_id}", response_model=ComputerPublic)
def update_computer(computer_id: int, computer_in: ComputerCreate, session: SessionDep) -> Any:
    """
    Update a computer's information.
    """
    return computer_crud.update_computer(session=session, computer_id=computer_id, new_data=computer_in)


@router.delete("/{computer_id}", response_model=ComputerPublic)
def delete_computer(computer_id: int, session: SessionDep) -> Any:
    """
    Delete a computer.
    """
    return computer_crud.delete_computer(session=session, computer_id=computer_id)
