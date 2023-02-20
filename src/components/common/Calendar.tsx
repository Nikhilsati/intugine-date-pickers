import { Dropdown } from "@intugine-technologies/mui";
import { Box, styled } from "@mui/material";
import { addMonths, getMonth, getYear, subMonths } from "date-fns";
import { useCallback, useState } from "react";
import ReactCalendar, { CalendarProps } from "react-calendar";
import { IPickerProps } from "../types";
import LeftIcon from "../icons/LeftIcon";
import RightIcon from "../icons/RightIcon";
import useControlled from "../../hooks/useControlled";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const styleMap = {
  paper: {
    large: {
      width: "372px",
      minHeight: "443px",
    },
    medium: {
      width: "320px",
      minHeight: "395px",
    },
    small: {
      width: "264px",
      minHeight: "347px",
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

export const StyledReactCalendar = styled(
  (props: CalendarProps & { size: "small" | "medium" | "large" }) => (
    <Box sx={{ width: "min-content" }}>
      <ReactCalendar {...props} showNavigation={false} />
    </Box>
  ),
  {
    // shouldForwardProp: (prop) => prop !== 'color' && prop !== 'variant' && prop !== 'sx' && prop !== 'size',
  }
)(({ theme, size }) => ({
  "& .react-calendar__viewContainer": {
    padding: "16px",
  },
  "& .react-calendar__month-view__weekdays": {
    ...theme.typography.h5,
    textAlign: "center",
    "& > .react-calendar__month-view__weekdays__weekday": {
      width: styleMap.cell[size].width,
      height: styleMap.cell[size].height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& abbr[title]": {
      textDecoration: "none !important",
    },
  },
  "& .react-calendar__tile": {
    background: "#ffffff",
    color: "#1A1A1A",
    borderRadius: "4px",
    border: "none",
    ...theme.typography.body1,
    ...styleMap.cell[size],
    "&:disabled": {
      color: "#A1A1A1 !important",
    },
    "&:hover": {
      backgroundColor: "#F5F8FF",
    },
    "&:focus": {
      outline: "none",
      border: "1px solid #264CA4",
    },
  },
  "& .react-calendar__tile--active": {
    background: "#2C63E5",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#264CA4",
    },
  },
  "& .react-calendar__month-view__days__day--neighboringMonth": {
    color: "#A1A1A1",
  },
  "& .react-calendar__tile--active.react-calendar__month-view__days__day--neighboringMonth":
    {
      color: "#A1A1A1",
      backgroundColor: "#F2F2F2 !important",
    },
}));

const Calendar = ({
  size = "medium",
  defaultValue,
  onChange,
  value,
  maxDate,
  minDate,
}: IPickerProps<Date> & CalendarProps) => {
  const BASE_YEAR_FOR_DROPDOWN = new Date().getFullYear() - 25;

  const [currentDate, setCurrentDate] = useControlled<Date>({
    default: defaultValue ?? value ?? new Date(),
    controlled: value,
    name: "Calendar",
  });

  const [currentView, setCurrentView] = useState(currentDate);

  const handleDateChange = useCallback(
    (e: Date) => {
      const newCurrentView = new Date(e);
      const prevDate = currentDate;
      e.setHours(
        prevDate.getHours(),
        prevDate.getMinutes(),
        prevDate.getSeconds()
      );
      onChange(e);
      setCurrentDate(e);
      setCurrentView(newCurrentView);
    },
    [currentDate]
  );

  const handleNextMonth = () => {
    setCurrentView((currentView) => addMonths(currentView, 1));
  };
  const handlePrevMonth = () => {
    setCurrentView((currentView) => subMonths(currentView, 1));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: size === "small" ? "0 16px" : "0 20px",
          paddingBottom: "0px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: size !== "small" ? "202px" : "212px",
          }}
        >
          <Dropdown
            size="small"
            width={106}
            value={{
              // @ts-ignore
              id: months[getMonth(currentView)],
              name: months[getMonth(currentView)],
            }}
            options={months.map((item) => ({ id: item, name: item }))}
            onChange={(option: any) => {
              const newCurrentView = new Date(currentView);
              newCurrentView.setMonth(
                months.findIndex((item) => item === option?.id)
              );
              setCurrentView(newCurrentView);
            }}
          />
          <Dropdown
            size="small"
            width={80}
            // @ts-ignore
            value={{ id: getYear(currentView), name: getYear(currentView) }}
            onChange={(option: any) => {
              const newCurrentView = new Date(currentView);
              newCurrentView.setFullYear(option?.id);
              setCurrentView(newCurrentView);
            }}
            options={new Array(50).fill(10).map((item, index) => ({
              id: index + BASE_YEAR_FOR_DROPDOWN,
              name: index + BASE_YEAR_FOR_DROPDOWN,
            }))}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "54px",
            "& > span": {
              cursor: "pointer",
            },
          }}
        >
          <span onClick={handlePrevMonth}>
            <LeftIcon fontSize="small" />
          </span>
          <span onClick={handleNextMonth}>
            <RightIcon fontSize="small" />
          </span>
        </Box>
      </Box>
      <StyledReactCalendar
        size={size}
        showNavigation={false}
        activeStartDate={currentView}
        value={currentDate}
        onChange={handleDateChange}
        maxDate={maxDate}
        minDate={minDate}
      />
    </Box>
  );
};

export default Calendar;
