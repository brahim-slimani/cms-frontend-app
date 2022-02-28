import { FormControl, FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';

export const CheckBox = (props) => {
    const { label, checked, onChange } = props;
    return (
        <FormControl>
            <FormControlLabel
                label={props.label}
                control={<Checkbox
                    size="small"
                    label={label}
                    defaultChecked
                    checked={checked}
                    onChange={onChange} />} />
        </FormControl>
    );
}