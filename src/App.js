import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Chatbot from "./Chatbot";

const theme = createTheme(); // You can customize this theme

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Chatbot />
    </ThemeProvider>
  );
};

export default App;