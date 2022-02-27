import React from 'react';
import IconButton from "@mui/material/IconButton";
import { Tooltip } from '@mui/material';

export const IconBtn = (props) => {
    const { color, icon, title, onClick } = props;
    return (
        <Tooltip title={title}>
            <IconButton
                sx={{ height: 28, width: 28, border: "1px solid", marginRight: "5px" }}
                size="small"
                color={color}
                onClick={onClick}
                aria-label={title}>
                <i className={icon} style={{ fontSize: "14px" }} />
            </IconButton>
        </Tooltip>
    );
}