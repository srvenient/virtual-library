from fastapi import HTTPException
from sqlmodel import Session, select
from app.api.book.models.book_models import Book, BookCreate, BookPublic, BooksPublic


def create_book(session: Session, book_data: BookCreate) -> BookPublic:
    book = Book(**book_data.dict())
    session.add(book)
    session.commit()
    session.refresh(book)
    return BookPublic(**book.dict())


def get_all_books(session: Session) -> BooksPublic:
    books = session.exec(select(Book)).all()
    return BooksPublic(data=[BookPublic(**b.dict()) for b in books], count=len(books))


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
