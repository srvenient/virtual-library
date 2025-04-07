from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date


class BookBase(SQLModel):
    title: str = Field(max_length=255)
    author: str = Field(max_length=255)
    publication_date: date =  None
    campus_name: str = Field(default=None, max_length=255)
    cover_url: str = Field(default=None, max_length=512)


class BookCreate(BookBase):
    pass


class Book(BookBase, table=True):
    id: int = Field(default=None, primary_key=True)


class BookPublic(BookBase):
    id: int


class BooksPublic(SQLModel):
    data: list[BookPublic]
    count: int
