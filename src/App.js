import React from "react";
import { Routes } from "components/navigation/routes";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import 'assets/scss/style.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0d6efd',
        dark: '#0850b9',
        contrastText: '#fff',
      }
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
