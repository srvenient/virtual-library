import {useForm, Controller} from 'react-hook-form';
import {registerRequest} from "../api/auth.ts";
import {Link} from 'react-router-dom';
import InputErrorMessage from "../components/common/InputErrorMessage.tsx";


export default function RegisterPage() {
    const {register, handleSubmit, formState: {errors, isValid}, control} = useForm({mode: 'onChange'});
    const onSubmit = handleSubmit(async (data) => {
        // @ts-ignore
        const response = registerRequest(data);
        console.log(response);
    });

    return (
        <div>
            <div className="bg-white flex justify-center items-center h-screen">
                <div className="flex flex-col">
                    <p className="text-gray-600 text-[18px] text-center mb-4">
                        <span className="text-black text-[32px] mb-4">Regístrate</span><br/>
                        Ingresa los siguientes datos para confirmar tu<br/>
                        identidad.
                    </p>
                    <form
                        className="flex flex-col items-center gap-y-4"
                        onSubmit={onSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="bg-gray-100 border-gray-400 w-full border-b py-4 pl-3"
                            {...register('fullName', {required: true})}
                        />
                        <input
                            type="email"
                            placeholder="Correo institucional"
                            className="bg-gray-100 border-gray-400 w-full border-b py-4 pl-3"
                            {...register('email', {
                                required: true,
                                validate: (value) => {
                                    if (value === '@unimonserrate.edu.co') {
                                        return 'Debes ingresar el correo institucional completo';
                                    }
                                    return /^[a-zA-Z0-9._%+-]+@unimonserrate\.edu\.co$/.test(value) || 'El correo debe ser institucional';
                                }
                            })}
                        />
                        {errors.email?.message && (<InputErrorMessage message={String(errors.email.message)}/>)}
                        <input
                            type="tel"
                            placeholder="Número de teléfono"
                            className="bg-gray-100 border-gray-400 w-full border-b py-4 pl-3"
                            {...register('phoneNumber', {
                                required: true,
                                validate: (value) => /^[0-9]{10}$/.test(value) || 'El número de teléfono debe tener 10 dígitos'
                            })}
                        />
                        {errors.phoneNumber?.message && (
                            <InputErrorMessage message={String(errors.phoneNumber.message)}/>)}
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="bg-gray-100 border-gray-400 w-full border-b py-4 pl-3"
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
                                    message: 'La contraseña debe tener al menos una letra y un número',
                                },
                            })}
                        />
                        {errors.password?.message && (<InputErrorMessage message={String(errors.password.message)}/>)}
                        <Controller
                            name="acceptedTerms"
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
                                        <Link to="/terms-and-conditions"
                                              className="underline text-sky-600">
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