import { Button } from "@intugine-technologies/mui";
import { format } from "date-fns";
import { useRef, useState } from "react";
import Textbox from "../components/common/Textbox";
import DatePicker from "../components/DatePicker";
import CalendarIcon from "../components/icons/CalendarIcon";
import DatePopper from "../DatePopper";

const DatePickerExample = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const textBoxRef = useRef();
  const [date, setDate] = useState<Date | undefined>();

  const handleDate = (date: Date) => {
    setDate(date);
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
          label="Date Picker"
          ActionComponent={Button}
          width={320}
          onClick={() => setAnchorEl(textBoxRef.current)}
          onKeyDown={() => setAnchorEl(textBoxRef.current)}
          value={date ? format(date, "dd/MMM/yyyy") : ""}
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
      <DatePicker
        size="medium"
        defaultValue={date}
        onApply={handleDate}
        onCancel={() => setAnchorEl(null)}
      />
    </DatePopper>
  );
};
export default DatePickerExample;
