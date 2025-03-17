import {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {useFormContext} from "react-hook-form";

const name = "password";

export default function PasswordInput() {
    const {
        register,
        watch,
        formState: {errors}
    } = useFormContext();
    const password = watch(name);
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="relative flex flex-col">
            <div
                className="relative"
            >
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    className={`bg-gray-100 border-[#121212] text-base min-w-[350px] p-10 border-b py-4 pl-3 placeholder:text-gray-500 focus:outline-none ${errors[name]?.message ? "border-red-800" : ""}`}
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                        },
                        maxLength: {
                            value: 20,
                            message: "La contraseña no puede tener más de 20 caracteres"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"
                        }
                    })}
                />
                {password && password.length > 0 && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                    >
                        {passwordVisible ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-700"/>
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-700"/>
                        )}
                    </button>
                )}
            </div>
            {errors[name]?.message && (
                <div
                    className="flex justify-center items-start gap-1 text-red-600 text-xs text-center max-w-[350px] min-h-[20px] mb-[-10px] mt-2 flex-wrap">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4 flex-shrink-0"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-black whitespace-normal break-words">
                        {errors[name]?.message as string}
                    </span>
                </div>
            )}
        </div>
    );
}
