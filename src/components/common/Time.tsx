import { Radio, Switch } from "@intugine-technologies/mui";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { format, isEqual } from "date-fns";
import { useState } from "react";
import Actions from "./Actions";
import {
  IPickerProps,
  ITimeInputProps,
  TMeridian,
  TTimeFormat,
} from "../types";
import useTime from "../hooks/useTime";
import BottomIcon from "../icons/BottomIcon";
import TopIcon from "../icons/TopIcon";
import useRenderOnce from "../hooks/useRenderOnce";

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
  container: {
    large: {
      width: "230px",
      height: "347px",
    },
    medium: {
      width: "230px",
      height: "297px",
    },
    small: {
      width: "194px",
      height: "255px",
    },
  },
  timeInput: {
    box: {
      large: {
        width: "64px",
        height: "118px",
      },
      medium: {
        width: "64px",
        height: "118px",
      },
      small: {
        width: "56px",
        height: "118px",
      },
    },
    button: {
      border: "1px solid #BFD2FD",
      background: "#F5F8FF",
      flex: 1,
    },
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

const TimeInput = ({
  defaultValue,
  value,
  size,
  type = "hour",
  timeFormat = 24,
  onChange,
}: ITimeInputProps) => {
  const theme = useTheme();
  const { currentValue, handleInput, handleNext, handlePrev } = useTime({
    defaultValue,
    value,
    type,
    onChange,
  });

  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          ...styleMap.timeInput.box[size],
        },
        {
          "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },

          /* Firefox */
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input": {
            color: "#666666",
            "&: focus": {
              border: "1px solid #2C63E5 !important",
            },
          },
        },
      ]}
    >
      <button
        style={{
          ...styleMap.timeInput.button,
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          borderBottom: "none",
          boxSizing: "border-box",
        }}
        onClick={handleNext}
      >
        <TopIcon />
      </button>
      <input
        style={{
          height: "56px",
          border: "1px solid #C7C7C7",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
          outline: "none",
          textAlign: "center",
          ...theme.typography.h4,
        }}
        type="number"
        value={
          type === "hour"
            ? format(currentValue, timeFormat === 12 ? "hh" : "HH")
            : format(currentValue, "mm")
        }
        onChange={handleInput}
      />
      <button
        style={{
          ...styleMap.timeInput.button,
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          borderTop: "none",
          boxSizing: "border-box",
        }}
        onClick={handlePrev}
      >
        <BottomIcon />
      </button>
    </Box>
  );
};

export interface ITimeProps extends IPickerProps<Date> {
  showTimeFormat?: boolean;
  defaultTimeFormat?: TTimeFormat;
}
const Time = ({
  size = "medium",
  defaultValue,
  onChange,
  value,
  showTimeFormat = true,
  defaultTimeFormat = 12
}: ITimeProps) => {
  const [currentTime, setCurrentTime] = useRenderOnce({
    initialValue: defaultValue ?? value ?? new Date(),
    isEqual,
    onChange,
    value,
  });

  const [timeFormat, setTimeFormat] = useState<TTimeFormat>(defaultTimeFormat);

  const handleTimeFormatChange = () =>
    setTimeFormat((timeFormat) => (timeFormat === 12 ? 24 : 12));

  const handleMeridianChange = (meridian: TMeridian) => () => {
    if (meridian === "AM") {
      currentTime.setHours(currentTime.getHours() % 12);
    } else {
      currentTime.setHours((currentTime.getHours() + 12) % 24);
    }
    setCurrentTime(new Date(currentTime));
  };

  const handleInputChange = (newDate: Date) => {
    setCurrentTime(new Date(newDate));
  };

  return (
    <Box>
      {showTimeFormat && <Box display="flex" justifyContent={"flex-end"} paddingRight="24px">
        <Switch
          label="Use 24-hour format"
          size="medium"
          checked={timeFormat === 24}
          onClick={handleTimeFormatChange}
          sx={{
            ".MuiSwitch-switchBase": {
              margin: "2px !important",
            },
            ".MuiSwitch-switchBase+.MuiSwitch-track": {
              backgroundColor: "#A1A1A1 !important",
            },
            ".MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
              backgroundColor: "#2C63E5 !important",
            },
          }}
        />
      </Box>}
      <Box
        height={showTimeFormat ? styleMap.container[size].height : "auto"}
        width={styleMap.container[size].width}
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginBottom={"16px"}
      >
        <Box sx={{ width: size === "small" ? "135px" : "167px" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <TimeInput
              value={currentTime}
              size={size}
              type="hour"
              timeFormat={timeFormat}
              onChange={handleInputChange}
            />
            <Typography variant="h2" sx={{ color: "#666666" }}>
              :
            </Typography>
            <TimeInput
              value={currentTime}
              size={size}
              type="minute"
              timeFormat={timeFormat}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="8px"
          >
            <Typography
              variant="body1"
              sx={{ color: "#666666", width: "64px" }}
            >
              Hour
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#666666", width: "64px" }}
            >
              Minute
            </Typography>
          </Box>
        </Box>
        <Box>
          {timeFormat === 12 && (
            <Box>
              {["AM", "PM"].map((item) => (
                <Radio
                  key={item}
                  label={item}
                  size="medium"
                  sx={{ height: "20px" }}
                  checked={
                    item === "AM"
                      ? currentTime.getHours() < 12
                      : currentTime.getHours() >= 12
                  }
                  onClick={handleMeridianChange(item as TMeridian)}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Time;
