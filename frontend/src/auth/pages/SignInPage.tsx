import FeatureNavbar from "../../shared/components/navigation/FeatureNavbar.tsx";
import {FormProvider, useForm} from "react-hook-form";
import PasswordInput from "../components/inputs/PasswordInput.tsx";
import EmailInput from "../components/inputs/EmailInput.tsx";
import Button from "../components/buttons/Button.tsx";
import {Link} from "react-router-dom";
import useLogin from "../hooks/useLogin.ts";

export default function SignInPage() {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {email: "", password: ""}
    });
    const {handleSubmit, formState: {isValid}} = methods;

    const {handleLogin} = useLogin();

    const onSubmit = handleSubmit(handleLogin);

    return (
        <div
            className="bg-white"
        >
            <FeatureNavbar
                label="Acceso de Usuario"
            />
            <div
                className="flex justify-center items-center mt-16"
            >
                <div
                    className="flex flex-col max-w-4xl gap-x-8 gap-y-4 p-8"
                >
                    <p
                        className="text-2xl text-black w-[300px]"
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
                        <p className="text-[12.5px] font-bold">
                            Consulta libros y recursos digitales<br/>
                            de manera ágil y segura.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}