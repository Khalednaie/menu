import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "./i18n";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
