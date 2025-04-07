from typing import Any

from fastapi import APIRouter, HTTPException, Query
from starlette import status

from app.api.deps import SessionDep
from app.api.book.models.book_models import BookCreate, BookPublic, BooksPublic
from app.api.book.repository import book_crud

router = APIRouter(tags=["book"], prefix="/books")


@router.post("", response_model=BookPublic, status_code=status.HTTP_201_CREATED)
def create_book(book_in: BookCreate, session: SessionDep) -> Any:
    """
    Create a new book in the library.
    """
    try:
        return book_crud.create_book(session=session, book_data=book_in)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=BooksPublic)
def get_all_books(
        session: SessionDep,
        page: int = Query(1, ge=1),
        limit: int = Query(10, ge=1)
) -> Any:
    """
    Get a paginated list of all books in the library.
    """
    try:
        return book_crud.get_all_books(session=session, page=page, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{title}", response_model=BookPublic)
def get_book_by_title(title: str, session: SessionDep) -> Any:
    """
    Get a single book by its title.
    """
    return book_crud.get_book_by_title(session=session, title=title)
