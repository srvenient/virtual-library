import {Book} from "../models/book.model.ts";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/useReduxHooks.ts";
import {fetchBooks} from "../../redux/states/book.slice.ts";
import {RootState} from "../../redux/store.ts";
import BookCard from "../components/ui/BookCard.tsx";
import NavbarTest from "../components/navigation/Navbar.tsx";
import Pagination from "../components/ui/Pagination.tsx";

const ITEMS_PER_PAGE = 10;

export default function BookPage() {
    const dispatch = useAppDispatch();
    const {books, count, loading} = useAppSelector((state: RootState) => state.books);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    useEffect(() => {
        dispatch(fetchBooks({page: currentPage, limit: ITEMS_PER_PAGE}));
    }, [dispatch, currentPage]);

    return (
        <div className="min-h-screen">
            <NavbarTest/>
            <div className="py-2 px-2 max-w-screen-xl mx-auto mt-7 rounded-4xl">
                <div
                    className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 min-h-[800px]">
                    {loading
                        ? [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white animate-pulse rounded-xl h-[350px] shadow-md"
                            >
                                <div className="bg-gray-300 h-72 w-full"></div>
                                <div className="px-4 py-3 space-y-1">
                                    <div className="bg-gray-300 h-5 w-3/4 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                                </div>
                            </div>
                        ))
                        : books.map((book: Book) => (
                            <BookCard key={book.id} book={book}/>
                        ))
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
