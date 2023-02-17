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
    isEqual: (a: Date, b: Date) => isEqual(a, b),
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
    let newDate: Date;
    if (type === "hour") {
      const currentHours = currentValue.getHours();
      newDate = setHours(currentValue, currentHours - 1);
    } else {
      const currentMinutes = currentValue.getMinutes();
      newDate = setMinutes(currentValue, currentMinutes - 1);
    }
    newDate.setDate(currentValue.getDate());
    newDate.setMonth(currentValue.getMonth());
    newDate.setFullYear(currentValue.getFullYear());
    setCurrentValue(newDate);
  };

  const handleNext = () => {
    let newDate: Date;
    if (type === "hour") {
      const currentHours = currentValue.getHours();
      newDate = setHours(currentValue, currentHours + 1);
    } else {
      const currentMinutes = currentValue.getMinutes();
      newDate = setMinutes(currentValue, currentMinutes + 1);
    }
    newDate.setDate(currentValue.getDate());
    newDate.setMonth(currentValue.getMonth());
    newDate.setFullYear(currentValue.getFullYear());
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
