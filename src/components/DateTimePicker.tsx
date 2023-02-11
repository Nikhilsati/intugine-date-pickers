import { Tabs } from "@intugine-technologies/mui";
import { Paper } from "@mui/material";
import { isEqual } from "date-fns";
import useActive from "../hooks/useActive";
import DatePicker from "./DatePicker";
import useRenderOnce from "./hooks/useRenderOnce";
import { IPickerProps } from "./types";
import TimePicker from "./TimePicker";

const styleMap = {
  paper: {
    large: {
      width: "372px",
    },
    medium: {
      width: "320px",
    },
    small: {
      width: "264px",
    },
  },
  cell: {
    large: {
      width: "48px",
      height: "48px",
    },
    medium: {
      width: "40px",
      height: "40px",
    },
    small: {
      width: "32px",
      height: "32px",
    },
  },
};

const DateTimePicker = ({
  size = "medium",
  defaultValue,
  onChange,
  value,
  onApply,
  onCancel,
}: IPickerProps<Date>) => {
  const activePickerState = useActive(0);
  const [currentDate, setCurrentDate] = useRenderOnce({
    initialValue: defaultValue ?? value ?? new Date(),
    isEqual: (a: Date, b: Date) => isEqual(a, b),
    onChange,
    value,
  });

  const handleCurrentDateChange = (date: Date) => setCurrentDate(date);

  return (
    <Paper
      elevation={0}
      sx={[
        {
          boxSizing: "border-box",
          boxShadow: "0px 24px 40px 0px #1A1A1A29",
          height: "max-content",
          borderRadius: "4px",
          ...styleMap.paper[size],
        },
      ]}
    >
      <Tabs
        tabs={[
          { label: "Date", style: { width: "50%" } },
          { label: "Time", style: { width: "50%" } },
        ]}
        onTabChange={activePickerState.handleActive}
      />
      {activePickerState.active === 0 ? (
        <DatePicker
          size={size}
          value={currentDate}
          onChange={handleCurrentDateChange}
          onApply={onApply}
          onCancel={onCancel}
        />
      ) : (
        <TimePicker
          size={size}
          value={currentDate}
          onChange={handleCurrentDateChange}
          onApply={onApply}
          onCancel={onCancel}
        />
      )}
    </Paper>
  );
};

export default DateTimePicker;
