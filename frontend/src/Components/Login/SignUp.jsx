import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CountrySelect from '../Company/CountrySelect.jsx';
import { registerUser } from '../Services/authServices.js';
import { registerCompany } from '../Services/authServices.js';


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

export default function SignUp() {
    const [value, setValue] = useState(0);
    const [companyCountry, setCompanyCountry] = useState('');

    // Snackbar states
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (value === 0) {
            const userDto = {
                username: data.get('username'),
                email: data.get('email'),
                password: data.get('password'),
            };

            try {
                await registerUser(userDto);
                setSnackbarSeverity('success');
                setSnackbarMessage('User registered successfully!');
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarSeverity('error');
                setSnackbarMessage(error.message || 'User registration failed');
                setSnackbarOpen(true);
            }
        } else if (value === 1) {
            const companyDto = {
                companyName: data.get('companyName'),
                email: data.get('companyEmail'),
                password: data.get('password'),
                location: companyCountry?.label || companyCountry?.value || '',
            };

            try {
                await registerCompany(companyDto);
                setSnackbarSeverity('success');
                setSnackbarMessage('Company registered successfully!');
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarSeverity('error');
                setSnackbarMessage(error.message || 'Company registration failed');
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link href={'/'}>
                        <img src={'src/Logo.png'} alt="logo of JobHub" />
                    </Link>
                    <Typography component="h1" variant="h5">Sign up</Typography>
                    <Tabs value={value} onChange={handleChange} aria-label="sign up tabs">
                        <Tab label="User" />
                        <Tab label="Company" />
                    </Tabs>
                    {value === 0 && (
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="username" label="Username" name="username" autoComplete="given-name" autoFocus />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" autoComplete="new-password" />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={'/sign-in'} variant="body2">Already have an account? Sign in</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    {value === 1 && (
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="companyName" label="Company Name" name="companyName" autoComplete="company-name" autoFocus />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="companyEmail" label="Company Email Address" name="companyEmail" autoComplete="email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <CountrySelect value={companyCountry} onChange={setCompanyCountry} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" autoComplete="new-password" />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={'/sign-in'} variant="body2">Already have an account? Sign in</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
