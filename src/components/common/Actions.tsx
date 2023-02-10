import { Box } from "@mui/material";
import { Button } from "@intugine-technologies/mui";
import { IActionProps } from "../types";


const Actions = ({
  size = "medium",
  applyButtonProps,
  cancelButtonProps,
  containerProps
}: IActionProps) => {
  return (
    <Box
      {...containerProps}
      sx={[{
        display: "flex",
        backgroundColor: "#F5F8FF",
        height: "64px",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
      },
      ...(containerProps?.sx ?? [])
    ]}
    >
      <Button
        text="Cancel"
        variant="outlined"
        color="secondary"
        sx={{
          marginRight: size === "small" ? "16px" : "24px",
          width: size === "small" ? "98px" : "117px",
        }}
        {...cancelButtonProps}
      />
      <Button
        text="Apply"
        variant="contained"
        color="primary"
        sx={{ width: size === "small" ? "98px" : "117px" }}
        {...applyButtonProps}
      />
    </Box>
  );
};

export default Actions;
