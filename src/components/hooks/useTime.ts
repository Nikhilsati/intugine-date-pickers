import { setHours, setMinutes } from "date-fns";
import useControlled from "../../hooks/useControlled";

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
  const [currentValue, setCurrentValue] = useControlled({
    default: defaultValue ?? value ?? new Date(),
    controlled: value,
    name: "Time",
  });

  const handleInput = (e: any) => {
    let value = parseInt(e.target.value) ?? 0;
    let newValue: Date;
    if (type === "hour") {
      newValue = setHours(currentValue, value % 24);
    } else {
      newValue = setMinutes(currentValue, value % 60);
    }
    setCurrentValue(newValue);
    onChange(newValue);
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
    onChange(newDate);
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
    onChange(newDate);
  };

  return {
    currentValue,
    handleInput,
    handleNext,
    handlePrev,
  };
};

export default useTime;
