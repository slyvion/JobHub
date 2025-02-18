import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Link } from '@mui/material';

export default function Privacy() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Link
                color="text.secondary"
                onClick={handleClickOpen}
                sx={{ fontFamily: 'Arial, sans-serif', cursor: 'pointer'}}>
                Privacy
            </Link>
            <Dialog open={open} onClose={handleClose} scroll="paper">
                <DialogTitle>Privacy Policy</DialogTitle>
                <DialogContent dividers={true}>
                    <Typography>

                        Privacy policy text lorem ipsum...
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
