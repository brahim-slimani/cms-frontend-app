import React from 'react';
import { Button, FormGroup } from '@mui/material';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";


export const CustomButton = (props) => {
    const { label, variant } = props;
    const theme = createTheme({
        typography: {
            button: {
                textTransform: "capitalize"
            }
        }
    });
    return (
        <FormGroup>
            <ThemeProvider theme={theme}>
                <Button {...props} variant={variant ? variant : "contained"}>{label}</Button>
            </ThemeProvider>
        </FormGroup>
    );
}