import { Paper } from "@mui/material";
import React from "react";
import Actions from "./Actions";
import { IPickerContainerProps } from "../types";

const styleMap = {
  paper: {
    large: {
      width: "372px",
      minHeight: "432px",
    },
    medium: {
      width: "320px",
      minHeight: "384px",
    },
    small: {
      width: "264px",
      minHeight: "336px",
    },
  },
};

const PickerContainer = ({
  children,
  size,
  actionProps,
  showActions = true,
}: IPickerContainerProps) => {
  return (
    <Paper
      elevation={0}
      sx={[
        {
          boxSizing: "border-box",
          paddingTop: "16px",
          boxShadow: "0px 24px 40px 0px #1A1A1A29",
          borderRadius: "4px",
          ...styleMap.paper[size],
        },
      ]}
    >
      {children}
      {showActions && <Actions {...actionProps} />}
    </Paper>
  );
};

export default PickerContainer;
