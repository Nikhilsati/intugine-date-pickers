import { useRef, useState } from "react";
import { Button } from "@intugine-technologies/mui";
import { format } from "date-fns";
import Textbox from "../components/common/Textbox";
import DateTimeRangePicker from "../components/DateTimeRangePicker";
import CalendarIcon from "../components/icons/CalendarIcon";
import { TDateRange } from "../components/types";
import DatePopper from "../DatePopper";
import TimeRangePicker from "../components/TimeRangePicker";

const TimeRangePickerExample = () => {
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
          placeholder="from hh:mm to hh:mm"
          label="Time Range Picker"
          ActionComponent={Button}
          width={320}
          onClick={() => setAnchorEl(textBoxRef.current)}
          onKeyDown={() => setAnchorEl(textBoxRef.current)}
          value={`From: ${format(
            dateRange?.startDate,
            "hh:mm a"
          )} - To: ${format(dateRange?.endDate, "@hh:mm a")}`}
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
      <TimeRangePicker
        size="medium"
        defaultValue={dateRange}
        onApply={handleDateRange}
        onCancel={() => setAnchorEl(null)}
      />
    </DatePopper>
  );
};

export default TimeRangePickerExample;
