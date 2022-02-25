import { Button, FormGroup } from '@mui/material';
import React from 'react';

export const CustomButton = (props) => {
    const { label, variant } = props;
    return (
        <FormGroup>
            <Button {...props} variant={variant ? variant : "contained"}>{label}</Button>
        </FormGroup>
    );
}