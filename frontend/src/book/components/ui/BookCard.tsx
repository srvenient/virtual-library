import {Book} from "../../models/book.model.ts";

export default function BookCard({book}: { book: Book }) {
    return (
        <div
            className="bg-[#f4f4f4] flex flex-col h-[400px] hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out shadow-sm cursor-pointer"
        >
            <img
                className="w-full h-62 object-cover"
                src={book.cover_url}
                alt={`Portada del libro ${book.title}`}
            />
            <div className="flex flex-col justify-between flex-1 px-4 py-3">
                <div>
                    <h1 className="text-lg font-medium text-theme-gray-darkest line-clamp-2">
                        {book.title}
                    </h1>
                    <p className="text-sm text-theme-gray-medium">por {book.author}</p>
                </div>
                <button className="mt-4 text-left hover:bg-theme-blue-light transition duration-200">
                    <span className="text-theme-medium-blue font-medium">Reservar</span>
                </button>
            </div>
        </div>
    )
}