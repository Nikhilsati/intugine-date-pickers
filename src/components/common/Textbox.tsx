import React, {
  Component,
  ComponentProps,
  forwardRef,
  FunctionComponent,
  ReactComponentElement,
  useMemo,
} from "react";

import MuiBox from "@mui/material/Box";
import MuiInputBase from "@mui/material/InputBase";
import MuiInputLabel from "@mui/material/InputLabel";
import { mergeDeep } from "../../deepMerge";
import { useTheme } from "@mui/material/styles";
import type { InputBaseProps } from "@mui/material/InputBase";
import { Button } from "@intugine-technologies/mui";
export interface IBootstrapInputProps extends InputBaseProps {
  alert?: boolean;
  width?: number | string;
  [key: string]: any;
}

export const BootstrapInput = forwardRef(
  (
    {
      sx,
      alert = false,
      width = 312,
      size = "small",
      label,
      disabled = false,
      ...otherProps
    }: IBootstrapInputProps,
    ref
  ) => {
    const theme: any = useTheme();

    const finalSx = useMemo(() => {
      const originalSx = {
        "& .MuiInputBase-input": {
          ...(size === "small" && {
            ...theme.typography.h6,
          }),

          ...(size === "medium" && {
            ...theme.typography.h5,
          }),
          borderRadius: "4px",
          position: "relative",
          border: `1px solid ${theme.palette.grey[350]}`,
          backgroundColor: disabled ? theme.palette.grey[150] : `#ffffff`,
          width: width ? width : "312px",
          cursor: disabled ? "not-allowed" : "text",
          borderColor:
            alert && !disabled
              ? theme.palette?.support?.error?.main
              : theme.palette.grey[100],
          "&::placeholder": {
            color: disabled
              ? theme.palette.grey[100]
              : `${theme.palette.grey[650]} !important`,
            opacity: `1 !important`,
          },
          alignSelf: "flex-end",
          ...(size === "small"
            ? {
                ...theme.typography.body2,
              }
            : {
                ...theme.typography.body1,
              }),
          height: size === "small" ? "32px" : "40px",
          padding: size === "small" ? "8px 12px" : "10px 16px",
          color: disabled
            ? theme.palette.grey[100]
            : theme.palette.common.black,
          "&:focus": {
            borderColor: theme.palette.primary.main,
          },
          "&:not(:placeholder-shown):invalid": {
            borderColor: theme.palette?.support?.error?.main,
          },

          boxSizing: "border-box",
        },
      };

      return mergeDeep(originalSx, sx);
    }, [sx, theme, alert, width, size, disabled]);

    return (
      <MuiInputBase
        size={size}
        sx={finalSx}
        disabled={disabled}
        style={{
          width: "100%",
        }}
        inputRef={ref}
        {...otherProps}
      />
    );
  }
);

export interface ITextboxProps extends InputBaseProps {
  label?: string;
  size: "small" | "medium";
  alert?: boolean;
  id?: string;
  children?: React.ReactElement;
  actionProps?: any;
  ActionComponent?: FunctionComponent<any>;
  [key: string]: any;
}

const Textbox = forwardRef(
  (
    {
      label,
      sx,
      size = "small",
      alert,
      id,
      required,
      disabled,
      ActionComponent,
      actionProps = {},
      ...otherProps
    }: ITextboxProps,
    ref
  ) => {
    const theme = useTheme();
    return (
      <MuiBox
        sx={[
          {
            flexWrap: "wrap",
            position: "relative",
            width: "max-content",
            ...(!label &&
              !required && {
                height: size === "small" ? "32px" : "40px",
              }),
          },
        ]}
      >
        {(label || required) && (
          <MuiInputLabel
            sx={[
              size === "small" && {
                ...theme.typography.h6,
              },
              size === "medium" && {
                ...theme.typography.h5,
              },
              {
                marginBottom: size === "small" ? "4px" : "8px",
                color: disabled
                  ? theme.palette.grey[100]
                  : `${theme.palette.common.black} !important`,
              },
            ]}
            htmlFor={id}
          >
            {label} <span>{required ? "*" : ""}</span>
          </MuiInputLabel>
        )}
        <BootstrapInput
          size={size}
          required={required}
          alert={alert}
          id={id}
          sx={sx}
          label={label}
          disabled={disabled}
          ref={ref}
          {...otherProps}
        />

        {ActionComponent && (
          <ActionComponent
            {...actionProps}
            inputAlert={alert}
            fromTextbox
            inputSize={size}
            inputReq={required}
            inputLabel={!!label && label.length > 0}
          />
        )}
      </MuiBox>
    );
  }
);
export default Textbox;

