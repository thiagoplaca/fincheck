import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
  const inputId = id ?? name;
  return (
    <div className="relative">
      <input
        {...props}
        name={name}
        id={inputId}
        className="w-full bg-white rounded-lg border border-gray-500 h-[52px] px-3 pt-4 text-gray-800 peer placeholder-shown:pt-0  focus:border-gray-800 transition-all duration-150 outline-none"
        placeholder=" "
      />
      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all duration-150"
      >
        {placeholder}
      </label>
    </div>
  );
}
