import React from 'react';
import { Box, CircularProgress, circularProgressClasses } from '@mui/material';

export const Loader = (props) => {
    const { size, label } = props;
    return (
        <Box sx={{ position: 'relative' }} className="d-flex">
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={size ? size : 40}
                thickness={4}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#1090ff' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={size ? size : 40}
                thickness={4}
            />
            <span className='mx-2'>{label}</span>
        </Box>
    );
}