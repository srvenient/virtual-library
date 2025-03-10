import FeatureNavbar from "../../shared/components/navigation/FeatureNavbar.tsx";
import Input from "../components/inputs/Input.tsx";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/buttons/Button.tsx";
import useRegister from "../hooks/useRegister.ts";
import PasswordInput from "../components/inputs/PasswordInput.tsx";
import EmailInput from "../components/inputs/EmailInput.tsx";

export default function SignUpPage() {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            full_name: '',
            email: '',
            phone_number: '',
            password: '',
            disabled: false,
            accepted_terms: false
        }
    });
    const {handleSubmit, formState: {isValid}, control, reset} = methods;

    const {handleRegister, error, success} = useRegister();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await handleRegister(data);
            reset();
        } catch (error: any) {
            console.error(error);
        }
    })

    return (
        <div
            className="bg-white"
        >
            <FeatureNavbar
                label="Registro de Usuario"
                buttonIconColor="#fff"
                buttonBackground="var(--color-theme-teal-deep)"
                buttonAction={() => navigate('/')}
            />
            <div
                className="flex flex-col justify-center items-center mt-16"
            >
                {
                    error && <label className="flex flex-col items-center text-red-600 text-center text-xl mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 mb-2"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        No se pudo realizar el registro.<br/>
                        Ya existe un usuario con el correo ingresado.
                    </label>
                }
                {
                    success &&
                    <p className="flex flex-col items-center text-green-600 text-center text-xl mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 items-center mb-2"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Te has registrado exitosamente. <br/>
                        <span>
                                <Link to='/' className="text-sky-600 underline">Inicia sesión</Link> para
                                continuar.
                            </span>
                    </p>
                }
                <div
                    className="flex flex-col justify-center items-center text-black text-center mb-5 w-[25%]"
                >
                    <h1
                        className="text-[33px] w-[70%] mb-3"
                    >
                        Regístrate en la Biblioteca Virtual
                    </h1>
                    <p
                        className="text-neutral-600 text-base w-[80%]"
                    >
                        Ingresa tus datos personales para registrarte en la Biblioteca Virtual de la Unimonserrate.
                    </p>
                </div>
                <div
                    className="w-full flex justify-center items-center"
                >
                    <FormProvider
                        {...methods}
                    >
                        <form
                            className="flex flex-col justify-center items-center gap-5 w-[80%]"
                            onSubmit={onSubmit}
                        >
                            <Input
                                name="full_name"
                                type="text"
                                placeholder="Nombre completo"
                                rules={{required: true}}
                            />
                            <EmailInput/>
                            <Input
                                name="phone_number"
                                type="tel"
                                inputMode="numeric"
                                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                                placeholder="Número de teléfono"
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "El número de teléfono debe tener 10 dígitos"
                                    }
                                }}
                            />
                            <PasswordInput/>
                            <Controller
                                name="accepted_terms"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <div className="items-center mt-[-1px]">
                                        <input
                                            id="accepted_terms"
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label className="text-gray-700 text-[15px]">
                                            Acepto los{' '}
                                            <Link to="/terms-and-conditions" className="underline text-sky-600">
                                                términos y condiciones
                                            </Link>
                                        </label>
                                    </div>
                                )}
                            />
                            <Button
                                type={"submit"}
                                label={"Registrarse"}
                                width={"10rem"}
                                disabled={!isValid}
                            />
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}