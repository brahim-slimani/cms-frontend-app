import React, { forwardRef, useImperativeHandle } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const Popup = forwardRef((props, ref) => {
    const { title, children } = props;
    const [openPopup, setOpenPopup] = React.useState(false);
    useImperativeHandle(ref,
        () => ({
            openPopup() {
                setOpenPopup(true);
            },
            closePopup() {
                setOpenPopup(false);
            }
        })
    );
    const onClose = () => {
        setOpenPopup(false);
    }
    return (
        <Dialog maxWidth="md" open={openPopup} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
});