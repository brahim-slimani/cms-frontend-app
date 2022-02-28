import React from "react";
import { Routes } from "components/navigation/routes";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import utils from "utils";

import 'assets/scss/style.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function App() {

  const theme = createTheme(utils.CUSTOM_MUI_THEME);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
