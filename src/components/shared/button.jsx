import { Button, FormGroup } from '@mui/material';
import React from 'react';

export const CustomButton = (props) => {
    const { label } = props;
    return (
        <FormGroup sx={{ my: 2 }}>
            <Button {...props} variant="contained">{label}</Button>
        </FormGroup>
    );
}