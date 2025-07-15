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
                sx={{ fontFamily: "Barlow, sans-serif", cursor: 'pointer'}}>
                Privacy
            </Link>
            <Dialog open={open} onClose={handleClose} scroll="paper">
                <DialogTitle>Privacy Policy</DialogTitle>
                <DialogContent dividers={true}>
                    <Typography sx={{fontFamily: "Barlow, sans-serif"}}>
                        This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.

                        <br /><br />
                        <strong>Information We Collect</strong><br />
                        We may collect information such as your name, email address, and usage data when you create an account, use our services, or contact us.

                        <br /><br />
                        <strong>How We Use Your Information</strong><br />
                        We use your information to provide, maintain, and improve our services, communicate with you, and ensure the security of our platform.

                        <br /><br />
                        <strong>Sharing Your Information</strong><br />
                        We do not sell your personal information. We may share data with service providers who help us operate our business, or if required by law.

                        <br /><br />
                        <strong>Your Choices</strong><br />
                        You can access, update, or delete your information by contacting us. You may also opt out of certain communications.

                        <br /><br />
                        <strong>Security</strong><br />
                        We take reasonable measures to protect your information from unauthorized access, disclosure, or loss.

                        <br /><br />
                        <strong>Changes to This Policy</strong><br />
                        We may update this policy from time to time. We will notify you of any significant changes by posting the new policy on our website.

                        <br /><br />
                        <strong>Contact Us</strong><br />
                        If you have any questions about this policy, please contact us at contact@JobHub.com.
                    </Typography>

                </DialogContent>
            </Dialog>
        </>
    );
}
