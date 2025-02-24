import {Link} from "react-router-dom";
import NavbarPublic from "../../shared/components/header/NavbarPublic.tsx";
import {useForm} from "react-hook-form";
import {useLogin} from "../hooks/useLogin.ts";
import ErrorMessage from "../../shared/components/ErrorMessage.tsx";

export default function LoginPage() {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {
            full_name: '',
            email: '',
            phone_number: '',
            password: '',
            accepted_terms: false,
        }
    });
    const {handleLogin, error} = useLogin();

    const onSubmit = handleSubmit(handleLogin);

    return (
        <div>
            <NavbarPublic currentSection="Acceso a Biblioteca Virtual" buttonBack={false}/>
            <div className="bg-white flex justify-center items-center mt-16 font-bbva">
                <div className="flex max-w-4xl bg-white gap-x-8">
                    <div className="flex flex-col w-96 justify-center">
                        {error &&
                            <p className="flex flex-col items-center text-red-600 text-center text-xl mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Correo o contraseña incorrectos.<br/>
                                <span>
                                    Si no tienes cuenta, <Link to='/register' className="text-sky-600 underline">regístrate
                                    aquí</Link>
                                </span>
                            </p>}
                        <p className="text-black text-[21px] mb-4 w-[300px] leading-[30px]">
                            Hola, ingresa tu correo institucional y contraseña para entrar a la Biblioteca Virtual:
                        </p>
                        <form
                            className="flex flex-col items-center gap-y-4"
                            onSubmit={onSubmit}
                        >
                            <input
                                type="email"
                                placeholder="Correo institucional"
                                className="bg-gray-100 border-gray-800 w-full border-b py-4 pl-3"
                                {...register('email', {
                                    required: true,
                                    validate: (value) => /^[a-zA-Z0-9._%+-]+@unimonserrate\.edu\.co$/.test(value) || 'El correo debe ser institucional'
                                })}
                            />
                            {errors.email?.message && (<ErrorMessage text={String(errors.email.message)}/>)}

                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="bg-gray-100 border-gray-800 w-full border-b py-4 pl-3"
                                {
                                    ...register('password', {
                                        required: 'La contraseña fue requerida.',
                                        minLength: {
                                            value: 6,
                                            message: 'La contraseña tuvo menos de 6 caracteres.',
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'La contraseña superó los 20 caracteres.',
                                        }
                                    })
                                }

                            />
                            {errors.password?.message && (<ErrorMessage text={String(errors.password.message)}/>)}
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`font-bbva font-medium text-[15px] h-[55px] min-w-[170px] ${!isValid ? 'text-black bg-gray-400 opacity-30' : 'bg-[#1973b8] hover:bg-sky-700 text-white'}`}
                            >
                                Entrar
                            </button>
                        </form>
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
                                    <button
                                        className="font-medium text-[15px] bg-[#1973b8] hover:bg-sky-700 h-[55px] min-w-[170px]">
                                        Regístrate
                                    </button>
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
        </div>
    );
};