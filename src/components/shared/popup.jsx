import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const Popup = forwardRef((props, ref) => {
    const { title, onConfirm, children } = props;
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
        <Dialog open={openPopup} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm}>Submit</Button>
            </DialogActions> */}
        </Dialog>
    );
});