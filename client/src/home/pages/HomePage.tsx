import {useAuth} from "../../auth/context/AuthContext.tsx";
import NavbarPrivate from "../../shared/components/header/NavbarPrivate.tsx";
import {Link} from "react-router-dom";

export default function HomePage() {
    const {user} = useAuth();

    return (
        <div className="font-bbva">
            <section className="w-full">
                <NavbarPrivate/>
            </section>
            <section className="bg-[#d4edfc] w-full h-full py-[80px] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <a className="font-bbvaBold text-[18px]">
                        Hola {user?.full_name?.split(" ")[0]}
                    </a>
                    <p className="text-[#004481] w-[400px] text-4xl font-bold mt-4">
                        ¡Descubre los beneficios de nuestra Biblioteca Virtual!
                    </p>
                    <p className="text-lg text-gray-800 mt-4 mb-7 w-[500px]">
                        Accede gratis a miles de libros digitales, consulta contenido exclusivo y disfruta de
                        lecturas sin límites desde nuestra página web. ¡Explora, aprende y sumérgete en el conocimiento
                        sin
                        fronteras!
                    </p>
                    <Link to={"/books"}>
                        <button
                            className="font-bbva font-medium bg-[#028484] text-[15px] text-white h-[55px] min-w-[170px]">
                            Sumérgete
                        </button>
                    </Link>
                </div>

                {/* Banner alineado a la derecha sin afectar el contenido */}
                <img
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full object-cover"
                    src="/src/assets/images/AQH-Page-Studying-scaled.jpg"
                    alt="Estudiante"
                    style={{
                        clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    }}
                />
            </section>

            <section className="flex flex-col items-center justify-center mt-10">
                <a className="text-[35px] mb-4">
                    ¿Qué necesito hoy?
                </a>
                <ul className="flex gap-x-4 mt-4 space-x-32">
                    <li>
                        <Link to={"/books"} className="text-[#1973b8] font-medium text-lg flex flex-col items-center">
                            <img
                                src={"/src/assets/images/book.png"}
                                alt={"Libros"}
                                className={"w-[90px] h-[90px] mb-3"}
                            />
                            Libros
                        </Link>
                    </li>
                    <li>
                        <a className={"text-[#1973b8] font-medium text-lg flex flex-col items-center"}>
                            <img
                                src={"/src/assets/images/laptop.png"}
                                alt={"Libros"}
                                className={"w-[90px] h-[90px] mb-3"}
                            />
                            Computadores
                        </a>
                    </li>
                    <li>
                        <a className={"text-[#1973b8] font-medium text-lg flex flex-col items-center"}>
                            <img
                                src={"/src/assets/images/meeting.png"}
                                alt={"Libros"}
                                className={"w-[90px] h-[90px] mb-3"}
                            />
                            Salas
                        </a>
                    </li>
                </ul>
            </section>
        </div>

    );
}