import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                JobHub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setEmailError('');
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSend = () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError('');
        console.log('Password reset email sent to:', email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ background: 'white', paddingTop: '100px', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Link href={'/'}>
                        <img src={'src/Logo.png'} alt="logo of JobHub" />
                    </Link>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
                            Sign In
                        </Button>
                        <Divider sx={{mb: 1}}> or </Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 , mb: 1}}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                            >
                                Sign in with Google
                            </Button>
                        </Box>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={handleOpen}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={'/sign-up'} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>

            <Modal open={open} onClose={handleClose}>
                <Paper sx={{ width: 400, p: 4, mx: 'auto', mt: '20%', textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Change your password
                    </Typography>
                    <Typography sx={{ opacity: '0.7' }} variant="body2" gutterBottom>
                        Enter the e-mail address that you registered your account with and we will send you a link to change your password.
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        placeholder="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                        <Button onClick={handleClose} variant="outlined">Close</Button>
                        <Button variant="contained" onClick={handleSend}>Send</Button>
                    </Box>
                </Paper>
            </Modal>
        </ThemeProvider>
    );
}