import { isEqual, setHours, setMinutes } from "date-fns";
import useRenderOnce from "./useRenderOnce";

export interface ITimeInputHookProps {
  defaultValue?: Date;
  value?: Date;
  type: "hour" | "minute";
  onChange?: (value: Date) => void;
}

/**
 * A Hook to manage the Time Component that can be used for Hour or Minute
 * handlePrev & handleNext function are use to subtract and add one unit of time respectively.
 * currentValue throws the latest Value, 
 * handleInput is used to directly change the input box,
 */
const useTime = ({
  defaultValue,
  value,
  type = "hour",
  onChange,
}: ITimeInputHookProps) => {
  const [currentValue, setCurrentValue] = useRenderOnce({
    initialValue: defaultValue ?? value ?? new Date(),
    isEqual,
    onChange,
    value,
  });

  const handleInput = (e: any) => {
    let value = parseInt(e.target.value) ?? 0;
    if (type === "hour") {
      setCurrentValue(setHours(currentValue, value % 24));
    } else {
      setCurrentValue(setMinutes(currentValue, value % 60));
    }
  };

  const handlePrev = () => {
    let newDate;
    if (type === "hour") {
      const currentHours = currentValue.getHours();
      newDate = setHours(currentValue, currentHours - 1);
    } else {
      const currentMinutes = currentValue.getMinutes();
      newDate = setMinutes(currentValue, currentMinutes - 1);
    }
    setCurrentValue(newDate);
  };

  const handleNext = () => {
    let newDate;
    if (type === "hour") {
      const currentHours = currentValue.getHours();
      newDate = setHours(currentValue, currentHours + 1);
    } else {
      const currentMinutes = currentValue.getMinutes();
      newDate = setMinutes(currentValue, currentMinutes + 1);
    }
    setCurrentValue(newDate);
  };

  return {
    currentValue,
    handleInput,
    handleNext,
    handlePrev,
  };
};

export default useTime;
