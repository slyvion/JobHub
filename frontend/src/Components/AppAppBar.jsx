import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AppBar, Toolbar, Button, Container, Divider, Typography, MenuItem, Drawer, IconButton, Menu, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { navigateToProfile } from '../Components/Services/authServices.js';

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            setOpen(false);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAnchorEl(null);
        navigate('/');
    };

    const handleProfileClick = async () => {
        setAnchorEl(null);
        setOpen(false);
        await navigateToProfile(navigate);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    variant="regular"
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor:
                            theme.palette.mode === 'light'
                                ? 'rgba(255, 255, 255, 0.4)'
                                : 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}
                >
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', ml: '-18px', px: 0 }}>
                        <Link to="/">
                            <img src="/Logo.png" style={logoStyle} alt="logo of JobHub" />
                        </Link>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {location.pathname === '/' && (
                                <>
                                    <MenuItem onClick={() => scrollToSection('features')} sx={{ py: '6px', px: '12px' }}>
                                        <Typography variant="body2" color="text.primary">Features</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('highlights')} sx={{ py: '6px', px: '12px' }}>
                                        <Typography variant="body2" color="text.primary">Highlights</Typography>
                                    </MenuItem>
                                </>
                            )}
                            <MenuItem component={Link} to="/companies" sx={{ py: '6px', px: '12px' }}>
                                <Typography variant="body2" color="text.primary" >Companies</Typography>
                            </MenuItem>
                            <MenuItem component={Link} to="/jobposts" sx={{ py: '6px', px: '12px' }}>
                                <Typography variant="body2" color="text.primary">JobPosts</Typography>
                            </MenuItem>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
                        {token ? (
                            <>
                                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    PaperProps={{ elevation: 3, sx: { mt: 1.5 } }}
                                >
                                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button color="primary" variant="text" size="small" component={Link} to="/sign-in">
                                    Sign in
                                </Button>
                                <Button color="primary" variant="contained" size="small" component={Link} to="/sign-up">
                                    Sign up
                                </Button>
                            </>
                        )}
                    </Box>

                    <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <Button variant="text" color="primary" aria-label="menu" onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
                            <MenuIcon />
                        </Button>
                        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ minWidth: '60dvw', p: 2, backgroundColor: 'background.paper' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }} />
                                {location.pathname === '/' && (
                                    <>
                                        <MenuItem onClick={() => scrollToSection('features')}>Features</MenuItem>
                                        <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>
                                    </>
                                )}
                                <MenuItem component={Link} to="/companies">
                                    <Typography variant="body2" color="text.primary">Companies</Typography>
                                </MenuItem>
                                <MenuItem component={Link} to="/jobposts">
                                    <Typography variant="body2" color="text.primary">JobPosts</Typography>
                                </MenuItem>
                                <Divider />
                                {token ? (
                                    <>
                                        <MenuItem onClick={handleProfileClick}>
                                            <Typography variant="body2">Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography variant="body2">Sign out</Typography>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <Button color="primary" variant="contained" component={Link} to="/sign-up" sx={{ width: '100%' }}>
                                                Sign up
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button color="primary" variant="outlined" component={Link} to="/sign-in" sx={{ width: '100%' }}>
                                                Sign in
                                            </Button>
                                        </MenuItem>
                                    </>
                                )}
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppAppBar;
