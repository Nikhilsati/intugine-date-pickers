import { isEqual } from "date-fns";
import Calendar from "./common/Calendar";
import PickerContainer from "./common/PickerContainer";
import useRenderOnce from "./hooks/useRenderOnce";
import { IPickerProps } from "./types";

const DatePicker = ({
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
      <Calendar
        size={size}
        defaultValue={defaultValue}
        value={currentDate}
        onChange={setCurrentDate}
      />
    </PickerContainer>
  );
};

export default DatePicker;
