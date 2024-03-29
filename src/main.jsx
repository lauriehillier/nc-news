import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { LocationProvider } from "./contexts/LocationContext.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#495464",
    }
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <LocationProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </LocationProvider>
    </UserProvider>
  </BrowserRouter>
);
