import FeatureNavbar from "../../shared/components/navigation/FeatureNavbar.tsx";
import {FormProvider, useForm} from "react-hook-form";
import PasswordInput from "../components/inputs/PasswordInput.tsx";
import EmailInput from "../components/inputs/EmailInput.tsx";
import Button from "../../shared/components/button/Button.tsx";
import {Link} from "react-router-dom";
import useLogin from "../hooks/useLogin.ts";
import errorIcon from "../../assets/images/error.svg";

export default function SignInPage() {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {email: "", password: ""}
    });
    const {handleSubmit, formState: {isValid}} = methods;

    const {handleLogin, error} = useLogin();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onSubmit = handleSubmit(handleLogin);

    return (
        <div
            className="bg-white"
        >
            <FeatureNavbar
                label="Acceso de Usuario"
            />
            {
                error && <label className="flex flex-col items-center text-red-600 text-center text-lg mb-4 mt-10">
                    <img
                        src={errorIcon}
                        alt="Error"
                        className="size-6 mb-2"
                    />
                    <p className="leading-5.5">
                        Correo o contraseña incorrectos.<br/>
                        <span>
                          Si no tienes cuenta, <Link to='/register' className="text-sky-600 underline">regístrate
                          aquí</Link>
                        </span>
                    </p>
                </label>
            }
            <div
                className={`flex justify-center items-center ${error ? "mt-8" : "mt-16"}`}
            >
                <div
                    className="flex flex-col max-w-4xl gap-x-8 gap-y-4 p-8"
                >
                    <p
                        className="text-2xl text-black w-[350px]"
                    >
                        Hola, ingresa tu correo institucional y contraseña para acceder a la Biblioteca Virtual:
                    </p>
                    <FormProvider
                        {...methods}
                    >
                        <form
                            className="flex flex-col gap-y-4"
                            onSubmit={onSubmit}
                        >
                            <EmailInput/>
                            <PasswordInput/>
                            <div
                                className="mt-2"
                            >
                                <Button
                                    type="submit"
                                    label="Ingresa"
                                    width="10rem"
                                    disabled={!isValid}
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <div className="bg-[#004481] h-[420px]">
                    <div className="text-white p-8 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-[21px] mb-4 w-[300px] leading-[30px]">
                                <span className="font-semibold">Haz tu vida más fácil y sencilla</span> con acceso
                                ilimitado a libros, artículos y más. Regístrate en nuestra Biblioteca Virtual hoy
                                mismo.
                            </p>
                            <Link to="/register">
                                <Button
                                    type="button"
                                    label="Regístrate"
                                    width="10rem"
                                />
                            </Link>
                        </div>
                        <p className="text-[14.5px] font-bold">
                            Consulta libros y recursos digitales<br/>
                            de manera ágil y segura.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}