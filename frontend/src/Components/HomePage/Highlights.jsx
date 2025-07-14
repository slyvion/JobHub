import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { motion } from 'framer-motion';

// Create motion version of Stack
const MotionStack = motion(Stack);

const items = [
    {
        icon: <RateReviewRoundedIcon />,
        title: 'Trusted Company Reviews',
        description:
            'Read and share authentic reviews from employees about companies, workplaces and cultures.',
    },
    {
        icon: <VisibilityOffRoundedIcon />,
        title: 'Anonymous Contributions',
        description:
            'Share your experiences anonymously to help others make better career decisions.',
    },
    {
        icon: <TouchAppRoundedIcon />,
        title: 'Easy-to-Use Interface',
        description:
            'Navigate seamlessly with a user-friendly design and powerful search tools.',
    },
    {
        icon: <BusinessRoundedIcon />,
        title: 'Employer Branding Opportunities',
        description:
            'Companies can showcase their culture and values to attract top talent.',
    },
    {
        icon: <InsightsRoundedIcon />,
        title: 'Employee-Driven Insights',
        description:
            'Get honest feedback from employees about work-life balance, management, and career growth opportunities.',
    },
    {
        icon: <BarChartRoundedIcon />,
        title: 'Company Ratings and Rankings',
        description:
            'Compare companies based on ratings for culture, diversity, benefits, and more.',
    },
];

export default function Highlights() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: 'white',
                bgcolor: '#06090a',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h2" variant="h4" sx={{ fontFamily: "'Barlow', sans-serif"}}>
                        Highlights
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400',  fontFamily: "'Barlow', sans-serif" }}>
                        Your Career, Your Insights. Discover companies and reviews to make smarter career decisions.
                    </Typography>
                </Box>

                <Grid container spacing={2.5}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <MotionStack
                                direction="column"
                                color="inherit"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'grey.800',
                                    backgroundColor: 'grey.900',
                                    background: 'transparent',
                                }}
                            >
                                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                                <div>
                                    <Typography gutterBottom sx={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500}}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'grey.400', fontFamily: "'Barlow', sans-serif" }}>
                                        {item.description}
                                    </Typography>
                                </div>
                            </MotionStack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
