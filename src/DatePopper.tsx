import { ClickAwayListener, Popper } from "@mui/material";
import { useId } from "react";

const DatePopper = ({
  anchorEl,
  setAnchorEl,
  children,
  parentElement,
}: any) => {
  const id = useId();
  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div>
        {parentElement}
        <Popper
          id={id}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
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
        >
          {children}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default DatePopper;
