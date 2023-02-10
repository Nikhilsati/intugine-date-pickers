import { useRef, useState } from "react";
import { Button } from "@intugine-technologies/mui";
import { format } from "date-fns";
import Textbox from "../components/common/Textbox";
import DateTimeRangePicker from "../components/DateTimeRangePicker";
import CalendarIcon from "../components/icons/CalendarIcon";
import { TDateRange } from "../components/types";
import DatePopper from "../DatePopper";

const DateTimeRangePickerExample = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const textBoxRef = useRef();

  const [dateRange, setDateRange] = useState<TDateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateRange = (date: TDateRange) => {
    setDateRange(date);
    setAnchorEl(null);
  };

  return (
    <DatePopper
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      parentElement={
        <Textbox
          ref={textBoxRef}
          size="small"
          placeholder="dd/mm/yy"
          ActionComponent={Button}
          width={350}
          label="Date Time Range Picker"
          onClick={() => setAnchorEl(textBoxRef.current)}
          onKeyDown={() => setAnchorEl(textBoxRef.current)}
          value={`Duration: ${format(
            dateRange?.startDate,
            "dd/MMM/yyyy@hh:mm a"
          )} - ${format(dateRange?.endDate, "dd/MMM/yyyy@hh:mm a")}`}
          actionProps={{
            sx: {
              minWidth: "32px !important",
              "& .MuiButton-startIcon": {
                margin: 0,
              },
            },
            variant: "text",
            size: "small",
            startIcon: <CalendarIcon />,
            disableRipple: true,
            onClick: () => setAnchorEl(textBoxRef.current),
          }}
        />
      }
    >
      <DateTimeRangePicker
        size="medium"
        defaultValue={dateRange}
        onApply={handleDateRange}
        onCancel={() => setAnchorEl(null)}
      />
    </DatePopper>
  );
};

export default DateTimeRangePickerExample;
