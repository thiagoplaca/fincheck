import { type ComponentProps, type Ref } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  ref?: Ref<HTMLInputElement>;
  error?: string;
}

export function Input({
  placeholder,
  name,
  id,
  ref,
  error,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? name;
  return (
    <div className="relative">
      <input
        {...props}
        name={name}
        id={inputId}
        ref={ref}
        placeholder=" "
        className={cn(
          "w-full bg-white rounded-lg border border-gray-500 h-[52px] px-3 pt-4 text-gray-800 peer placeholder-shown:pt-0  focus:border-gray-800 transition-all duration-150 outline-none",
          error && "border-red-900!",
          className,
        )}
      />
      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all duration-150"
      >
        {placeholder}
      </label>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
