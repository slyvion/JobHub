import * as React from 'react';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Typography} from "@mui/material";

export default function Terms() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <React.Fragment>
            <Link
                color="text.secondary"
                sx={{fontFamily: "Barlow, sans-serif", cursor: 'pointer'}}
                onClick={handleClickOpen}>
                Terms
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Typography sx={{ fontFamily: "Barlow, sans-serif" }}>
                        <strong>1. Acceptance of Terms</strong><br />
                        By accessing or using this website, you agree to comply with and be bound by these Terms of Use.

                        <br /><br />
                        <strong>2. Use of the Website</strong><br />
                        You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the website.

                        <br /><br />
                        <strong>3. Intellectual Property</strong><br />
                        All content on this website, including text, graphics, logos, and software, is the property of the website owner or its licensors and is protected by intellectual property laws.

                        <br /><br />
                        <strong>4. User Accounts</strong><br />
                        If you create an account, you are responsible for maintaining the confidentiality of your login information and for all activities that occur under your account.

                        <br /><br />
                        <strong>5. Disclaimer of Warranties</strong><br />
                        The website and its content are provided "as is" without warranties of any kind, either express or implied.

                        <br /><br />
                        <strong>6. Limitation of Liability</strong><br />
                        The website owner is not liable for any damages arising from your use of the website.

                        <br /><br />
                        <strong>7. Changes to Terms</strong><br />
                        We may modify these Terms of Use at any time. Continued use of the website after changes constitutes acceptance of the new terms.

                        <br /><br />
                        <strong>8. Governing Law</strong><br />
                        These terms are governed by the laws of the jurisdiction in which the website owner operates.

                        <br /><br />
                        <strong>9. Contact Us</strong><br />
                        If you have questions about these Terms, please contact us at contact@JobHub.com.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
