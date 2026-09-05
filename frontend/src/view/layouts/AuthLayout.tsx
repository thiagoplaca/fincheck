import { Outlet } from "react-router";
import illustration from "../../assets/images/illustration.png";
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-16">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full p-8 justify-center items-center hidden lg:flex">
        <div className="max-w-164 max-h-240 w-full h-full relative">
          <img
            src={illustration}
            className="object-cover w-full h-full max-w-164 max-h-240 select-none rounded-[32px]"
            alt="illustration"
          />
          <div className="max-w-164 max-h-[210px] bg-white absolute bottom-0 p-10 rounded-b-[32px]">
            <Logo className="text-teal-900 h-8" />
            <p className="text-gray-700 font-medium text-xl mt-6">
              Gerencie suas finanças pessoais de uma forma simples com o
              fincheck, e o melhor, totalmente de graça!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
