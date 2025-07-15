import React, { useState } from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, Link, Box, Paper} from '@mui/material';

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
                sx={{ fontFamily: "Barlow, sans-serif", cursor: 'pointer'}}>
                Contact
            </Link>
            <Dialog open={open} onClose={handleClose} scroll="paper">
                <DialogContent dividers={true}>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Box sx={{ padding: 3, width: "500px" , }}>
                            <Typography variant="h6" gutterBottom align="center" sx={{fontFamily: "Barlow, sans-serif"}}>
                                Want to contact us or give a suggestion? <br />
                            </Typography>
                            <Typography variant="h6" gutterBottom align="center" sx={{opacity: 0.7, fontFamily: "Barlow, sans-serif"}}>
                                Contact us at <br />
                            </Typography>
                            <Typography variant="h3" align="center" sx={{ color: "primary.main", fontFamily: "Barlow, sans-serif" }}> contact@Jobhub.com </Typography>
                            <Typography variant="h6" align="center" sx={{paddingTop: '10px', fontFamily: "Barlow, sans-serif"}}> with subject "<strong>CONTACT</strong>" <br /></Typography>
                            <Typography variant="h6" align="center" sx={{fontFamily: "Barlow, sans-serif"}}> and we will reach with you as soon as possible</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
