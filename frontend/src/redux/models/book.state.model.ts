import {Book} from "../../book/models/book.model.ts";

export interface BookState {
  books: Book[];
  count: number;
  loading: boolean;
  error: string | null;
}
