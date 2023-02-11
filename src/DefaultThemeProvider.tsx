import lightTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const DefaultThemeProvider = ({ children }: { children: ReactNode}) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};
export default DefaultThemeProvider;
