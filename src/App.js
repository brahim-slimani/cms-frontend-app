import React from "react";
import { LoginPage } from "components/pages";

import 'assets/scss/style.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

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
        <LoginPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
