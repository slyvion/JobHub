import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';

const StatsCounter = () => {
    const [stats, setStats] = useState([
        { label: 'Companies', target: 0 },
        { label: 'Reviews', target: 0 },
        { label: 'Users', target: 0 },
        { label: 'Jobposts', target: 0 },
    ]);

    const counterRefs = useRef([]);

    useEffect(() => {
        fetch('http://localhost:8080/misc/counts')
            .then(res => res.json())
            .then(data => {
                setStats([
                    { label: 'Companies', target: data.companyCount },
                    { label: 'Reviews', target: data.reviewCount },
                    { label: 'Users', target: data.userCount },
                    { label: 'Jobposts', target: data.jobPostCount },
                ]);
            })
            .catch(err => {
                console.error('Failed to fetch stats:', err);
            });
    }, []);

    useEffect(() => {
        if (!stats.some(stat => stat.target > 0)) return;

        counterRefs.current.forEach(el => {
            if (el) el.textContent = '0';
        });

        const options = { root: null, rootMargin: '0px', threshold: 0.5 };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetValue = parseInt(entry.target.dataset.target, 10);
                    let startValue = 0;
                    const duration = 2000;
                    const increment = targetValue / (duration / 10);

                    const counter = setInterval(() => {
                        startValue += increment;
                        if (startValue < targetValue) {
                            entry.target.textContent = Math.ceil(startValue);
                        } else {
                            entry.target.textContent = targetValue;
                            clearInterval(counter);
                        }
                    }, 10);

                    observer.unobserve(entry.target);
                }
            });
        }, options);

        counterRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            counterRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [stats]);

    return (
        <Box sx={{ py: 8 }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.label}>
                            <Box
                                sx={{
                                    width: '150px',
                                    height: '150px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    mx: 'auto',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    component="h3"
                                    fontWeight="bold"
                                    data-target={stat.target}
                                    ref={el => (counterRefs.current[index] = el)}
                                    sx={{ fontSize: { xs: '3.5rem', md: '4.5rem' }, fontFamily: "'Barlow', sans-serif" }}
                                >
                                    0
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{ mt: 0.5, fontWeight: 'medium', fontFamily: "'Barlow', sans-serif" }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default StatsCounter;
