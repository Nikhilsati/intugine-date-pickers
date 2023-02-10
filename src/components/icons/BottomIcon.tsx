import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const BottomIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 6L8.48875 10.4325L13 6"
        stroke="#2C63E5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
    </SvgIcon>
  );
};

export default BottomIcon;
