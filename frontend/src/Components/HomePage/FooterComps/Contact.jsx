import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Link } from '@mui/material';

export default function Contact() {
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
                Contact
            </Link>
            <Dialog open={open} onClose={handleClose} scroll="paper">
                <DialogTitle>Contact Us</DialogTitle>
                <DialogContent dividers={true}>
                    <Typography>
                        contact blablabla
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
