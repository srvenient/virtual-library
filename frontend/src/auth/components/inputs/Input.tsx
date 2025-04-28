import {useFormContext} from "react-hook-form";
import React, {HTMLInputTypeAttribute} from "react";

type InputProps = {
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: object;
};

export default function Input({name, type, placeholder, inputMode, onInput, rules}: InputProps) {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <div className="relative flex flex-col justify-center items-center gap-1 w-full">
      <input
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        onInput={onInput}
        className={`bg-gray-100 border-[#121212] text-base min-w-[350px] p-10 border-b py-4 pl-3 placeholder:text-gray-500 focus:outline-none ${errors[name]?.message ? "border-red-800" : ""}`}
        {...register(name, rules)}
      />
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
