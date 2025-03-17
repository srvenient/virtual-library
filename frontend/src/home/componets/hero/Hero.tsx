import {useAppSelector} from "../../../redux/hooks/useReduxHooks.ts";
import Button from "../../../auth/components/buttons/Button.tsx";

function Hero() {
    const user = useAppSelector((state) => state.auth.user);

    const handleScroll = () => {
        const opcionesSection = document.getElementById("opciones");
        if (opcionesSection) {
            opcionesSection.scrollIntoView({behavior: "smooth"});
        }
    };

    return (
        <div
            className="bg-gray-50 w-full h-full py-[80px] relative"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <p
                    className="flex flex-col"
                >
                    <span
                        className="text-[#5ac4c4] font-family-special font-medium"
                    >
                        Hola {user?.fullName.split(" ")[0] + " " + user?.fullName.split(" ")[2]}
                    </span>
                    <span className="text-[#004481] text-4xl font-family-special font-bold mb-2 drop-shadow-lg">
                        Bienvenido a la Biblioteca Virtual
                    </span>
                    <span className="text-lg w-lg mb-4">
                        Encuentra recursos académicos como libros, artículos y tesis en formato digital. Además, accede a salas de estudio y computadoras para potenciar tu aprendizaje.
                    </span>
                </p>
                <Button
                    type={"button"}
                    label={"Explorá"}
                    width={"10rem"}
                    onClick={handleScroll}
                />
            </div>
        </div>
    );
}

export default Hero;