from fastapi import HTTPException
from sqlalchemy import func
from sqlmodel import Session, select
from app.api.book.models.book_models import Book, BookCreate, BookPublic, BooksPublic


def create_book(session: Session, book_data: BookCreate) -> BookPublic:
    book = Book(**book_data.dict())
    session.add(book)
    session.commit()
    session.refresh(book)
    return BookPublic(**book.dict())


def get_all_books(session: Session, page: int = 1, limit: int = 10) -> BooksPublic:
    offset = (page - 1) * limit
    total = session.exec(select(func.count()).select_from(Book)).one()
    books = session.exec(select(Book).offset(offset).limit(limit)).all()
    return BooksPublic(
        data=[BookPublic(**b.dict()) for b in books],
        count=total
    )


def get_book_by_title(session: Session, title: str) -> BookPublic:
    book = session.get(Book, title)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return BookPublic(**book.dict())


def update_book(session: Session, book_id: int, new_data: BookCreate) -> BookPublic:
    book = session.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    for field, value in new_data.dict().items():
        setattr(book, field, value)

    session.commit()
    session.refresh(book)
    return BookPublic(**book.dict())


def delete_book(session: Session, book_id: int):
    book = session.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    session.delete(book)
    session.commit()
    return {"message": "Book deleted"}
