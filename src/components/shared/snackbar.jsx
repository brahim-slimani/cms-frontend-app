import { Alert, Snackbar } from '@mui/material';
import React, { forwardRef, useImperativeHandle } from 'react';

export const ToastNotification = forwardRef((props, ref) => {
    const [snackProperties, setSnackPrperties] = React.useState({ open: false, servirity: null, message: null });
    useImperativeHandle(ref,
        () => ({
            showToast({ type, message }) {
                setSnackPrperties({ open: true, servirity: type, message: message });
            },
            clearToast() {
                setSnackPrperties({ open: false });
            }
        })
    );
    const handleClose = () => {
        setSnackPrperties({ ...snackProperties, open: false });
    }
    return (
        <Snackbar
            open={snackProperties.open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={6000}>
            <Alert
                variant="filled"
                severity={snackProperties.servirity}
                onClose={handleClose}
                sx={{ width: '100%' }}>
                {snackProperties.message}
            </Alert>
        </Snackbar>
    );
});