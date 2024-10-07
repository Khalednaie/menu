import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", // أصفر
    },
    secondary: {
      main: "#8B4513", // أسمر
    },
  },
  direction: "rtl", // لتفعيل اتجاه النص من اليمين لليسار
});

export default theme;
