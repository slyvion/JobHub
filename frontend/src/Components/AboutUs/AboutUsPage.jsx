import { Box, Container } from '@mui/material';
import AboutIntro from './AboutIntro';
import WhatWeDo from './WhatWeDo';
import VisionSection from './VisionSection';
import WhyUs from './WhyUs';
import JoinUs from './JoinUs';
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";

export default function AboutUsPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                fontFamily: "'Barlow', sans-serif"
            }}
        >
            <AppAppBar />

            <Container
                maxWidth="md"
                sx={{ flexGrow: 1, mt: { xs: 8, sm: 10 }, color: '#333' }}
            >
                <AboutIntro />
                <WhatWeDo />
            </Container>

            <VisionSection />

            <Container
                maxWidth="md"
                sx={{ flexGrow: 1, color: '#333', mt: 6, mb: 6 }}
            >
                <WhyUs />
                <JoinUs />
            </Container>

            <Footer />
        </Box>
    );
}
