import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  const windowWidth = useWindowWidth();
  const [sliderState, setSliderState] = useState({
    isBegining: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
  };
}
