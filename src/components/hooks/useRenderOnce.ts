import { useEffect, useState } from "react";

export interface IUseRenderOnceParams<T> {
  initialValue: T;
  value?: T;
  isEqual: (
    a: T,
    b: T
  ) => boolean;
  onChange?: (value: T) => void;
}
/**
 * A Hook to manage Controled Inner and Outer State of a component to prevent from re-rendering twice
 * Use it for a component if your component is
 * accepting value and onChange, 
 * managing its own state,
 * Syncing between the above to,
 */
const useRenderOnce = <T>({
  initialValue,
  value,
  isEqual,
  onChange,
}: IUseRenderOnceParams<T>) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    if (value) {
      onChange && !isEqual(currentValue, value) && onChange(currentValue);
    } else {
      onChange && onChange(currentValue);
    }
  }, [currentValue]);

  useEffect(() => {
    value && !isEqual(currentValue, value) && setCurrentValue(value);
  }, [value]);

  return [currentValue, setCurrentValue] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export default useRenderOnce;
