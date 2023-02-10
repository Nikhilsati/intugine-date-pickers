import { Box, Paper, Typography } from "@mui/material";
import { endOfDay, isEqual, startOfDay } from "date-fns";
import React from "react";
import Actions from "./common/Actions";
import Calendar from "./common/Calendar";
import Time from "./common/Time";
import useRenderOnce from "./hooks/useRenderOnce";
import { IPickerProps, TDateRange } from "./types";

const DateTimeRangePicker = ({
  defaultValue,
  value,
  onChange,
  onApply,
  onCancel,
}: IPickerProps<TDateRange>) => {
  const [dateRange, setDateRange] = useRenderOnce<TDateRange>({
    initialValue: defaultValue ??
      value ?? {
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
      },
    value,
    onChange,
    isEqual: (a, b) =>
      isEqual(a.startDate, b.startDate) && isEqual(a.endDate, b.endDate),
  });
  return (
    <Paper
      elevation={0}
      sx={[
        {
          width: "728px",
          boxSizing: "border-box",
          boxShadow: "0px 24px 40px 0px #1A1A1A29",
          borderRadius: "4px",
        },
      ]}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        padding={"32px"}
        flexWrap="wrap"
      >
        <Box>
          <Typography variant="h5" color="primary" mb="16px">
            Start Date
          </Typography>
          <Calendar
            size="medium"
            maxDate={dateRange.endDate}
            value={dateRange.startDate}
            onChange={(startDate: Date) =>
              setDateRange((prevDate) => ({ ...prevDate, startDate }))
            }
          />
        </Box>
        <Box>
          <Typography variant="h5" color="primary" mb="16px">
            End Date
          </Typography>
          <Calendar
            size="medium"
            minDate={dateRange.startDate}
            value={dateRange.endDate}
            onChange={(endDate: Date) =>
              setDateRange((prevDate) => ({ ...prevDate, endDate }))
            }
          />
        </Box>
        <Box width={"100%"} display="flex" justifyContent="space-between">
          <Time
            value={dateRange.startDate}
            onChange={(startDate: Date) =>
              setDateRange((prevDate) => ({ ...prevDate, startDate }))
            }
            showTimeFormat={false}
          />
          <Time
            value={dateRange.endDate}
            onChange={(endDate: Date) =>
              setDateRange((prevDate) => ({ ...prevDate, endDate }))
            }
            showTimeFormat={false}
          />
        </Box>
      </Box>
      <Actions
        containerProps={{
          sx: [
            {
              justifyContent: "flex-end",
              height: "80px !important",
              padding: "0 40px",
            },
          ],
        }}
        applyButtonProps={{
          onClick: () => onApply && onApply(dateRange),
        }}
        cancelButtonProps={{
          onClick: () => onCancel && onCancel(dateRange),
        }}
      />
    </Paper>
  );
};

export default DateTimeRangePicker;
