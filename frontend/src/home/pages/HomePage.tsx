import Navbar from "../componets/navigation/Navbar.tsx";
import Hero from "../componets/hero/Hero.tsx";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div
            className="bg-gray-50 min-h-screen"
        >
            <Navbar/>
            <Hero/>
            <div className="flex justify-center items-center mt-6">
                <div className="bg-green-50 p-6 rounded-lg shadow-md text-center w-full">

                </div>
            </div>

            <div
                id="opciones"
                className="flex flex-col justify-center items-center w-[600px] mx-auto mt-6 px-4"
            >
                <span className="mt-14 mb-3 text-black text-4xl text-center">
                    ¿Qué te gustaría hacer hoy?
                </span>
                <div className="grid grid-cols-2 grid-rows-2 gap-3 mt-5">
                    <div
                        className="bg-theme-blue-dark col-span-2 rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                        onClick={() => navigate("/books")}
                    >
                        <div
                            className="p-6 text-center text-white"
                        >
                            <h3
                                className="text-2xl font-semibold"
                            >
                                Biblioteca
                            </h3>
                            <p
                                className="text-sm mt-2 font-semibold"
                            >
                                Encuentra libros, artículos y documentos para tu formación.
                            </p>
                        </div>
                    </div>
                    <div
                        className="bg-theme-blue-light row-start-2 rounded-xl overflow-hidden shadow-lg
                        transition-transform transform hover:scale-105 cursor-not-allowed opacity-60"
                    >
                        <div
                            className="p-6 text-center text-white"
                        >
                            <h3
                                className="text-2xl font-semibold"
                            >
                                Computadores
                            </h3>
                            <p
                                className="text-sm mt-2 font-semibold"
                            >
                                Encuentra libros, artículos y documentos para tu formación.
                            </p>
                        </div>
                    </div>
                    <div
                        className="bg-theme-blue row-start-2 rounded-xl overflow-hidden shadow-lg
                        transition-transform transform hover:scale-105 cursor-not-allowed opacity-60"
                    >
                        <div
                            className="p-6 text-center text-white"
                        >
                            <h3
                                className="text-2xl font-semibold"
                            >
                                Salas de Estudio
                            </h3>
                            <p
                                className="text-sm mt-2 font-semibold"
                            >
                                Encuentra libros, artículos y documentos para tu formación.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="h-32"
            >
            </div>
        </div>
    );
}