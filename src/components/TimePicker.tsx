import { isEqual } from "date-fns";
import React from "react";
import PickerContainer from "./common/PickerContainer";
import Time from "./common/Time";
import useRenderOnce from "./hooks/useRenderOnce";
import { IPickerProps } from "./types";

const TimePicker = ({
  defaultValue,
  onApply,
  onCancel,
  onChange,
  size = "medium",
  value,
}: IPickerProps<Date>) => {
  const [currentDate, setCurrentDate] = useRenderOnce<Date>({
    initialValue: defaultValue ?? value ?? new Date(),
    value,
    onChange,
    isEqual: (a, b) => isEqual(a.getTime(), b.getTime()),
  });
  return (
    <PickerContainer
      size={size}
      actionProps={{
        size,
        cancelButtonProps: {
          onClick: () => onCancel && onCancel(currentDate),
        },
        applyButtonProps: {
          onClick: () => onApply && onApply(currentDate),
        },
      }}
    >
      <Time
        size={size}
        defaultValue={defaultValue}
        value={currentDate}
        onChange={setCurrentDate}
      />
    </PickerContainer>
  );
};

export default TimePicker;
