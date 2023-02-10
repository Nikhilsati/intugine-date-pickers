import { Box, ThemeProvider } from "@mui/material";
import lightTheme from "./theme";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/source-sans-pro";

import DateTimeRangePickerExample from "./examples/DateTimeRangePicker.example";
import DateRangePickerExample from "./examples/DateRangePicker.example";
import DatePickerExample from "./examples/DatePicker.example";
import DateTimePickerExample from "./examples/DateTimePicker.example";
import TimePickerExample from "./examples/TimePicker.example";
import TimeRangePickerExample from "./examples/TimeRangePicker.example";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box display={"flex"} justifyContent="space-around" flexDirection={"column"} height="100vh">

      <Box display={"flex"} justifyContent="space-around">
        <DatePickerExample />
        <TimePickerExample />
        <DateTimePickerExample />
      </Box>
      <Box display={"flex"} justifyContent="space-around">
        <DateRangePickerExample />
        <DateTimeRangePickerExample />
        <TimeRangePickerExample />
      </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
