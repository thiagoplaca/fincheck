import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function SliderNavigation() {
  const swiper = useSwiper();
  return (
    <>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex item justify-center items-center z-10 bg-gray-100 bg-linear-to-r from-gray-100 to-transparent"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="text-gray-800 w-6 h-6" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex item justify-center items-center z-10 bg-gray-100 bg-linear-to-l from-gray-100 to-transparent"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="text-gray-800 w-6 h-6" />
      </button>
    </>
  );
}
