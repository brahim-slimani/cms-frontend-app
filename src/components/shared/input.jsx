import React from 'react';
import TextField from "@mui/material/TextField"
import { FormGroup } from '@mui/material';

export const Input = (props) => {
    const { id, label, type, className, value, required, disabled, onChange, error, helperText, rows, multiline } = props;
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
                error={error}
                rows={rows}
                multiline={multiline}
                helperText={helperText}
                disabled={disabled}
            />
        </FormGroup>
    )
}