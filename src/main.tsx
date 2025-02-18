import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
