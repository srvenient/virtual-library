type Props = {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    selectedAuthor: string;
    onAuthorChange: (author: string) => void;
};

const categories: string[] = ["Ficción", "Historia", "Ciencia", "Infantil", "Filosofía"];
const authors: string[] = [
    "Gabriel García Márquez",
    "Isabel Allende",
    "Stephen King",
    "J.K. Rowling"
];

export default function Sidebar({selectedCategory, onCategoryChange, selectedAuthor, onAuthorChange}: Props) {
    return (
        <aside className="w-64 min-h-screen bg-[#1464a5] p-4 border-r ">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>

            {/* Categorías */}
            <div className="mb-6">
                <h3 className="font-medium text-sm text-gray-700 mb-2">Categoría</h3>
                <ul className="space-y-1">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <label className="inline-flex items-center text-sm">
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat}
                                    checked={selectedCategory === cat}
                                    onChange={() => onCategoryChange(cat)}
                                    className="mr-2"
                                />
                                {cat}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Autores */}
            <div>
                <h3 className="font-medium text-sm text-gray-700 mb-2">Autor</h3>
                <select
                    className="w-full text-sm px-2 py-1 border border-gray-300 rounded"
                    value={selectedAuthor}
                    onChange={(e) => onAuthorChange(e.target.value)}
                >
                    <option value="">Todos</option>
                    {authors.map((author) => (
                        <option key={author} value={author}>
                            {author}
                        </option>
                    ))}
                </select>
            </div>
        </aside>
    );
};