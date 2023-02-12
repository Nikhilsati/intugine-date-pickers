import { ClickAwayListener, Popper } from "@mui/material";
import { useId } from "react";
import { TDatePopper } from "../types";

const DatePopper = ({
  anchorEl,
  setAnchorEl,
  children,
  parentElement,
  containerProps,
  popperProps,
}: TDatePopper) => {
  const id = useId();
  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div {...containerProps}>
        {parentElement}
        <Popper
          modifiers={[
            {
              name: "preventOverflow",
              enabled: true,
              options: {
                altAxis: true,
                altBoundary: true,
                tether: true,
                rootBoundary: "document",
                padding: 8,
              },
            },
          ]}
          placement="bottom"
          style={{ zIndex: 999999 }}
          {...popperProps}
          id={id}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
        >
          {children}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default DatePopper;
