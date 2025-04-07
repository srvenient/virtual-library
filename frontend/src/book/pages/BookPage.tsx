import {Book} from "../models/book.model.ts";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/useReduxHooks.ts";
import {fetchBooks} from "../../redux/states/book.slice.ts";
import {RootState} from "../../redux/store.ts";
import BookCard from "../components/ui/BookCard.tsx";
import NavbarTest from "../components/navigation/Navbar.tsx";

const ITEMS_PER_PAGE = 10;

export default function BookPage() {
    const dispatch = useAppDispatch();
    const {books, count, loading} = useAppSelector((state: RootState) => state.books);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    useEffect(() => {
        dispatch(fetchBooks({page: currentPage, limit: ITEMS_PER_PAGE}));
    }, [dispatch, currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="min-h-screen">
            <NavbarTest/>
            <div className="py-6 px-2 max-w-screen-xl mx-auto mt-10 rounded-4xl">
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
                <div className="text-black flex justify-center gap-4 mt-6 items-center">
                    {
                        currentPage > 1 && (
                            <button
                                onClick={prevPage}
                                className="font-medium text-base"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-8"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        )
                    }
                    <span className=" font-medium px-1 py-2 whitespace-nowrap">
                        Página {currentPage} de {totalPages}
                    </span>
                    {
                        currentPage < totalPages && (
                            <button
                                onClick={nextPage}
                                className="font-medium text-base"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-8"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
