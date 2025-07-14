import { Typography, Box } from '@mui/material';
import visionImage from "../../assets/AboutParalax.png"

export default function VisionSection() {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                height: { xs: 300, md: 400 },
                mb: 4,
                backgroundImage: `url(${visionImage})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                my: 4,
                color: '#fff',
                fontFamily: "'Barlow', sans-serif",
                textShadow: '0 0 10px rgba(0,0,0,0.7)',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.4)',
                    zIndex: 1,
                }}
            />
            <Box sx={{ maxWidth: 700, textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Our Vision
                </Typography>
                <Typography variant="body1" paragraph>
                    The future of work is not just remote or hybrid. It's <strong>transparent, inclusive, and purpose-driven</strong>. At JobHub, we aim to support a job market where:
                </Typography>
                <Box component="ul" sx={{ textAlign: 'left', ml: 3 }}>
                    <li>Every candidate can evaluate not just “what” a job is, but <strong>“who” it’s for</strong>.</li>
                    <li>Every company can attract talent that <strong>believes in its mission</strong>.</li>
                    <li>Every interaction is built on <strong>clarity, honesty, and mutual respect</strong>.</li>
                </Box>
                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    We envision a hiring experience that is less transactional and more transformative — where the right people meet the right roles, and both thrive.
                </Typography>
            </Box>
        </Box>
    );
}
