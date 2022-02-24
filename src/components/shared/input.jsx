import React from 'react';
import TextField from "@mui/material/TextField"
import { FormGroup } from '@mui/material';

export const Input = (props) => {
    const { id, label, type, className, value, required, onChange } = props;
    return (
        <FormGroup sx={{ my: 2 }}>
            <TextField
                label={label}
                id={id}
                value={value}
                size="small"
                onChange={onChange}
                type={type}
                className={className}
                required={required}
                fullWidth
            />
        </FormGroup>
    )
}