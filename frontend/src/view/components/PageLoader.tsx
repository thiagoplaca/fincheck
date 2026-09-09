import { Logo } from "./Logo";
import { Spinner } from "./Spinner";
import { Transition } from "@headlessui/react";
import { clsx } from "clsx";

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <Transition show={isLoading}>
      <div
        className={clsx([
          "bg-teal-900 fixed top-0 left-0 w-full h-full flex items-center justify-center",
          "transition ease-in-out",
          "data-closed:opacity-0",
          "data-enter:duration-100",
          "data-leave:duration-300",
        ])}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <Logo className="h-10 text-white" />
          <Spinner className="text-teal-900  fill-white" />
        </div>
      </div>
    </Transition>
  );
}
