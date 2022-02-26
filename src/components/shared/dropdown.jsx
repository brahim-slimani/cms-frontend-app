import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const Dropdown = (props) => {
    const { id, label, value, onChange, items, helperText } = props
    return (
        <FormControl sx={{ width: "100%" }} error={helperText}>
            <InputLabel sx={{ marginBottom: 10 }}>{label}</InputLabel>
            <Select
                id={id}
                value={value}
                size="small"
                label={label}
                onChange={onChange}>
                {items.map(item => <MenuItem value={item.value}>{item.name}</MenuItem>)}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}