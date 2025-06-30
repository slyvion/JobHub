import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Terms from "./FooterComps/Terms.jsx";
import Privacy from "./FooterComps/Privacy.jsx";
import Contact from "./FooterComps/Contact.jsx";
import Popper from '@mui/material/Popper';

const logoStyle = {
    width: '140px',
    height: 'auto',
};

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" mt={1}>
            {'Copyright © '}
            <Link href="">JobHub&nbsp;</Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
        const targetScroll = sectionElement.offsetTop - offset;
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
        });
    }
};

export default function Footer() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <Box
            sx={{
                marginTop: 5,
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
                boxShadow: "0 4px 6px rgba(0, 1, 0, 0)",
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                    maxWidth: '1200px',
                    flexWrap: 'wrap',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        width: { xs: '100%', sm: '60%' },
                        mb: { xs: 4, sm: 0 },
                    }}
                >
                    <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
                        <Box sx={{ ml: '-15px' }}>
                            <img
                                src={'/Logo.png'}
                                style={logoStyle}
                                alt="logo of jobhub"
                            />
                        </Box>
                        <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'black' }}>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Subscribe to our newsletter for weekly updates and promotions.
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1}
                            useFlexGap
                            sx={{ width: '100%' }}
                        >
                            <TextField
                                id="outlined-basic"
                                hiddenLabel
                                size="small"
                                variant="outlined"
                                fullWidth
                                aria-label="Enter your email address"
                                placeholder="Your email address"
                                inputProps={{
                                    autoComplete: 'off',
                                    'aria-label': 'Enter your email address',
                                }}
                                sx={{ mb: { xs: 1, sm: 0 } }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ flexShrink: 0, width: { xs: '100%', sm: 'auto' } }}
                                onClick={handleClick}
                            >
                                Subscribe
                            </Button>
                            <Popper id={id} open={open} anchorEl={anchorEl}>
                                <Typography sx={{ p: 1 }}>ne rabote</Typography>
                            </Popper>
                        </Stack>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                        width: { xs: '100%', sm: 'auto' },
                        mb: { xs: 4, sm: 0 },
                    }}
                >
                    <Typography variant="body2" fontWeight={600} sx={{ color: 'black' }}>
                        Product
                    </Typography>
                    <Link
                        color="text.secondary"
                        sx={{ fontFamily: 'Arial, sans-serif', cursor: 'pointer' }}
                        onClick={() => scrollToSection('features')}
                    >
                        Features
                    </Link>

                    <Link
                        color="text.secondary"
                        sx={{ fontFamily: 'Arial, sans-serif', cursor: 'pointer' }}
                        onClick={() => scrollToSection('highlights')}
                    >
                        Highlights
                    </Link>

                    <Link
                        color="text.secondary"
                        sx={{ fontFamily: 'Arial, sans-serif' }}
                        href="companies"
                    >
                        Companies
                    </Link>

                    <Link
                        color="text.secondary"
                        sx={{ fontFamily: 'Arial, sans-serif' }}
                        href="jobposts"
                    >
                        JobPosts
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                        width: { xs: '100%', sm: 'auto' },
                        mb: { xs: 4, sm: 0 },
                    }}
                >
                    <Typography variant="body2" fontWeight={600} sx={{ color: 'black' }}>
                        Company
                    </Typography>
                    <Link
                        color="text.secondary"
                        sx={{ fontFamily: 'Arial, sans-serif' }}
                        href="/about-us"
                    >
                        About us
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                        width: { xs: '100%', sm: 'auto' },
                        mb: { xs: 4, sm: 0 },
                    }}
                >
                    <Typography variant="body2" fontWeight={600} sx={{ color: 'black' }}>
                        Legal
                    </Typography>
                    <Terms />
                    <Privacy />
                    <Contact />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    justifyContent: 'space-between',
                    pt: { xs: 4, sm: 8 },
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    maxWidth: '1200px',
                    gap: { xs: 2, sm: 0 },
                }}
            >
                <div>
                    <Copyright />
                </div>
                <Stack
                    direction="row"
                    justifyContent="left"
                    spacing={1}
                    useFlexGap
                    sx={{
                        color: 'text.secondary',
                        pl: { xs: 2, sm: 0 },
                    }}
                >
                    <IconButton
                        color="inherit"
                        href="https://github.com/slyvion/JobHub"
                        aria-label="GitHub"
                        sx={{ alignSelf: 'center' }}
                    >
                        <FacebookIcon />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        href="https://www.linkedin.com/in/slave-stamenov/"
                        aria-label="LinkedIn"
                        sx={{ alignSelf: 'center' }}
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
}
