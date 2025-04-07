import {useAppSelector} from "../../../redux/hooks/useReduxHooks.ts";
import {Link} from "react-router-dom";
import bookIcon from "../../../assets/images/book-study-svgrepo-com.svg";
import computerIcon
    from "../../../assets/images/online-library-digital-book-online-learning-laptop-ebook-reading-svgrepo-com.svg"
import tableIcon from "../../../assets/images/table-svgrepo-com.svg";
import {useState} from "react";

function Hero() {
    const user = useAppSelector((state) => state.auth.user);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center max-w-[var(--breakpoint-lg)] px-11 mx-auto mt-16">
            <div className="flex flex-row justify-start items-center w-full ">
                <h1 className="text-3xl font-medium justify-start">
                    Hola {user?.fullName.split(' ')[0]}
                </h1>
            </div>
            <div className="grid grid-cols-2 grid-rows-3 gap-5.5 mt-8">
                <Link
                    to={"/library"}
                      className="bg-white shadow-md p-4 h-auto hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    <div className="flex flex-row justify-start ">
                        <img
                            src={bookIcon}
                            alt="Icono de libro"
                            className="w-20 h-20 mb-2"
                        />
                        <div className="flex flex-col justify-start gap-y-2 ml-3">
                            <h2 className="text-base font-medium">Libros</h2>
                            <p className="text-base text-theme-gray-medium leading-5">
                                Encuentra libros, artículos y documentos para tu formación.
                            </p>
                        </div>
                    </div>
                </Link>
                <Link
                    to="/computers"
                      className="col-start-1 row-start-2 bg-white shadow-md p-4 h-auto hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    <div className="flex flex-row justify-start ">
                        <img
                            src={computerIcon}
                            alt="Icono de libro"
                            className="w-20 h-20 mb-2"
                        />
                        <div className="flex flex-col justify-start gap-y-2 ml-3">
                            <h2 className="text-base font-medium">Computadores</h2>
                            <p className="text-base text-theme-gray-medium leading-5">
                                Encuentra libros, artículos y documentos para tu formación.
                            </p>
                        </div>
                    </div>
                </Link>
                <Link
                    to="/rooms"
                      className="col-start-1 row-start-3 bg-white shadow-md p-4 h-auto hover:scale-105 transition-all duration-300 ease-in-out">
                    <div className="flex flex-row justify-start ">
                        <img
                            src={tableIcon}
                            alt="Icono de libro"
                            className="w-20 h-20 mb-2"
                        />
                        <div className="flex flex-col justify-start gap-y-2 ml-3">
                            <h2 className="text-base font-medium">Salas</h2>
                            <p className="text-base text-theme-gray-medium leading-5">
                                Encuentra libros, artículos y documentos para tu formación.
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="relative inline-block text-left w-full">
                    {/* Botón */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full bg-white shadow-md p-4 flex justify-between items-center"
                    >
                        <h1 className="text-sm font-bold">Notificaciones pendientes</h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`w-5 h-5 text-theme-royal-blue transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    <div
                        className={`absolute left-0 right-0 mt-1 bg-white shadow-lg overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-40 p-4 opacity-100" : "max-h-0 p-0 opacity-0"
                        }`}
                        style={{ transitionProperty: "max-height, opacity, padding" }}
                    >
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-center justify-between">
                                <span>Notificación 1</span>
                                <span className="text-gray-500">Hace 2 horas</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Notificación 2</span>
                                <span className="text-gray-500">Hace 4 horas</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Notificación 3</span>
                                <span className="text-gray-500">Hace 6 horas</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Notificación 4</span>
                                <span className="text-gray-500">Hace 8 horas</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Notificación 5</span>
                                <span className="text-gray-500">Hace 10 horas</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;