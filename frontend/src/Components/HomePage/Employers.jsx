import { Box, Typography, Grid, Container } from '@mui/material';

const Employers = () => {
    return (
        <Box sx={{ py: 10, backgroundColor: '#f8f8f8' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ fontFamily: "'Barlow', sans-serif"}}
                >
                    Attract the Right Talent
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 6 , fontFamily: "'Barlow', sans-serif", fontWeight: 500}}
                >
                    JobHub isn't just for job seekers. We provide powerful tools for employers to find, attract, and hire the best candidates for their teams.
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{fontFamily: "'Barlow', sans-serif"}}>
                            Post Job Openings
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'Barlow', sans-serif", fontWeight: 500}}>
                            Reach millions of qualified candidates actively looking for new opportunities.
                            Our platform makes it easy to get your job in front of the right people.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{fontFamily: "'Barlow', sans-serif"}}>
                            Manage Applicants
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'Barlow', sans-serif", fontWeight: 500}}>
                            A simple, intuitive dashboard to track and manage your hiring pipeline from application to offer. Save time and stay organized.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{fontFamily: "'Barlow', sans-serif"}}>
                            Build Your Brand
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'Barlow', sans-serif", fontWeight: 500}}>
                            Engage with reviews and showcase your company culture to attract top talent. A strong employer brand is your competitive advantage.
                        </Typography>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
};

export default Employers;
