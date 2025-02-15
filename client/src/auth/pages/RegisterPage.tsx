import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {registerRequest} from '../api/auth.ts';
import {Link} from 'react-router-dom';
import InputErrorMessage from '../components/error/InputErrorMessage.tsx';
import Navbar from '../components/nav/Navbar.tsx';

export default function RegisterPage() {
    const {register, handleSubmit, formState: {errors, isValid}, control, reset} = useForm({
        mode: 'onChange',
        defaultValues: {
            full_name: '',
            email: '',
            phone_number: '',
            password: '',
            accepted_terms: false,
        }
    });

    const [error, setError] = useState<boolean | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const onSubmit = handleSubmit(async (data: Record<string, any>) => {
        setError(null);
        setSuccess(false);

        try {
            await registerRequest(data);
            setSuccess(true);
            reset();
        } catch (error: any) {
            setError(true);
        }
    });

    return (
        <div>
            <Navbar currentSection="Registro en Biblioteca Virtual" buttonBack={true}/>
            <div className="bg-white flex justify-center items-center mt-16">
                <div className="flex flex-col">
                    {error && <label className="flex flex-col items-center text-red-600 text-center text-xl mb-4">
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
                        No se pudo realizar el registro.<br/>
                        El correo electrónico ya está en uso.
                    </label>}
                    {success &&
                        <p className="flex flex-col items-center text-green-600 text-center text-xl mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 items-center"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Te has registrado exitosamente. <br/>
                            <a>
                                <Link to='/' className="text-sky-600 underline">Inicia sesión</Link> para
                                continuar.
                            </a>
                        </p>}
                    <p className="text-gray-600 text-[18px] text-center mb-4">
                        <span className="text-black text-[32px] mb-4">Regístrate</span><br/>
                        Ingresa los siguientes datos para confirmar tu<br/>
                        identidad.
                    </p>
                    <form className="flex flex-col items-center gap-y-4" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="bg-gray-100 border-gray-800 w-full border-b py-4 pl-3"
                            {...register('full_name', {required: true})}
                        />
                        <input
                            type="email"
                            placeholder="Correo institucional"
                            className="bg-gray-100 border-gray-800 w-full border-b py-4 pl-3"
                            {...register('email', {
                                required: true,
                                validate: (value) => /^[a-zA-Z0-9._%+-]+@unimonserrate\.edu\.co$/.test(value) || 'El correo debe ser institucional'
                            })}
                        />
                        {errors.email?.message && (<InputErrorMessage message={String(errors.email.message)}/>)}

                        <input
                            type="tel"
                            placeholder="Número de teléfono"
                            className="bg-gray-100 border-gray-800 w-full border-b py-4 pl-3"
                            {...register('phone_number', {
                                required: true,
                                validate: (value) => /^[0-9]{10}$/.test(value) || 'El número de teléfono debe tener 10 dígitos'
                            })}
                        />
                        {errors.phone_number?.message && (
                            <InputErrorMessage message={String(errors.phone_number.message)}/>)}

                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="bg-gray-100 border-gray-800 w-full border-b py-4 pl-3"
                            {...register('password', {
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: 'La contraseña debe tener al menos 6 caracteres',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'La contraseña debe tener menos de 20 caracteres',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
                                },
                            })}
                        />
                        {errors.password?.message && (<InputErrorMessage message={String(errors.password.message)}/>)}

                        <Controller
                            name="accepted_terms"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <div className="items-center">
                                    <input
                                        type="checkbox"
                                        id="terms-conditions"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700">
                                        Acepto los{' '}
                                        <Link to="/terms-and-conditions" className="underline text-sky-600">
                                            términos y condiciones
                                        </Link>
                                    </label>
                                </div>
                            )}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`h-[50px] min-w-[160px] font-semibold ${!isValid ? 'text-black bg-gray-400 opacity-30' : 'bg-[#1973b8] hover:bg-sky-700 text-white'}`}
                        >
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
