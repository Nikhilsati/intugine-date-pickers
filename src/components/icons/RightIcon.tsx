import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const RightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 2L13.47 9.5607L6 17.1819"
        stroke="#2C63E5"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
    </SvgIcon>
  );
};

export default RightIcon;
