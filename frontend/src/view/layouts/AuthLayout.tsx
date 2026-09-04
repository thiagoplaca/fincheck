import illustration from "../../assets/images/illustration.png";
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-full"></div>

      <div className="w-1/2 h-full p-8 flex justify-center items-center">
        <div className="max-w-164 max-h-240 relative">
          <img
            src={illustration}
            className="w-full h-full max-w-164 max-h-240 select-none rounded-[32px]"
            alt="illustration"
          />
          <div className="max-w-164 max-h-[210px] bg-white absolute bottom-0 p-10 rounded-b-[32px]">
            <Logo className="text-green-900 h-8" />
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
