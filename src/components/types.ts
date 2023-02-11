import { ReactElement, ReactNode } from "react";

export type TMeridian = "AM" | "PM";
export type TTimeFormat = 12 | 24;
export type size = "small" | "medium" | "large";

export interface IPickerProps<T> {
  size?: size;
  value?: T;
  defaultValue?: T;
  onChange?: (date: T) => void;
  onApply?: (date: T) => void;
  onCancel?: (date: T) => void;
}

export interface ITimeInputProps {
  defaultValue?: Date;
  value?: Date;
  size: size;
  type: "hour" | "minute";
  timeFormat?: TTimeFormat;
  onChange?: (value: Date) => void;
}

export interface IActionProps {
  size?: size;
  cancelButtonProps?: any;
  applyButtonProps?: any;
  containerProps?: any;
}

export interface IPickerContainerProps {
  size: size;
  children: ReactNode;
  actionProps?: IActionProps;
  showActions?: boolean;
}

export type TDateRange = {
  startDate: Date,
  endDate: Date
}

export type TDatePopper = {
  anchorEl: any,
  setAnchorEl: any,
  children?: ReactNode,
  parentElement: ReactElement,
}
