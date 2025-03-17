import line from "../../assets/images/linea1.gif";
import accept from "../../assets/images/aceptar.gif";
import {Link, useParams} from "react-router-dom";

const types: Record<string, { title: string, message: string }> = {
    "invalid-credentials": {
        title: "Los datos ingresados son incorrectos. Por favor verifíquelos e ingréselos nuevamente.",
        message: "Si tienes dudas, contacta con nosotros, a través de nuestro correo electrónico o número telefónico."
    },
    "default": {
        title: "Ha ocurrido un error inesperado.",
        message: "Por favor, intenta más tarde."
    }
}

export default function ErrorPage() {
    const {type} = useParams<{ type?: string }>();
    const {title, message} = types[type || "default"];

    return (
        <table
            className="flex flex-col justify-center items-center h-[440px] text-center"
        >
            <tbody>
            <tr>
                <td
                    className="text-theme-deep-sky-blue font-semibold"
                >
                    Bienvenido al servicio de la Fundación Universitaria Monserrate
                </td>
            </tr>
            <tr className={"mt-6"}>
                <td>
                    <table
                        className="w-[544px] bg-white"
                    >
                        <tbody>
                        <tr>
                            <td>
                                <img
                                    src={line}
                                    alt="Linea de separación"
                                    className="mt-10"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p
                                    className="text-secondary text-lg/6 font-[arial] font-medium mt-8"
                                >
                                    <b>
                                        {
                                            title
                                        }
                                    </b>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p
                                    className="text-secondary text-lg/6 font-[arial] font-bold mt-5"
                                >
                                    {
                                        message
                                    }
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    src={line}
                                    alt="Linea de separación"
                                    className="mt-10"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p
                                    className="text-secondary text-lg/6 font-[arial] font-bold mt-5"
                                >
                                    Para volver a la página anterior da clic en el botón aceptar.
                                </p>
                                <Link
                                    to={`/`}
                                    className="flex justify-center items-center"
                                >
                                    <img
                                        src={accept}
                                        alt="Aceptar"
                                        className="mt-4"
                                    />
                                </Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
    )
}