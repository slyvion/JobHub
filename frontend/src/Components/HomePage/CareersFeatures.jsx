import { Box, Typography, Grid, Paper } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CampaignIcon from '@mui/icons-material/Campaign';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';

const features = [
    {
        icon: <SearchRoundedIcon sx={{ fontSize: 32, color: "#3f51b5" }} />,
        title: "Find Your Fit",
        description:
            "Not just a job — the right job. Discover roles that match your skills, values, and goals.",
    },
    {
        icon: <CampaignIcon sx={{ fontSize: 32, color: "#3f51b5" }} />,
        title: "Speak Your Truth",
        description:
            "Your experiences matter. Share honest insights to help others and shape better workplaces.",
    },
    {
        icon: <PhoneIphoneRoundedIcon sx={{ fontSize: 32, color: "#3f51b5" }} />,
        title: "Always With You",
        description:
            "Stay connected to opportunities and company insights — wherever life (or work) takes you.",
    },
];

const CareerFeatures = () => {
    return (
        <Box textAlign="center" py={6} px={2} bgcolor="#f8f8f8">
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Barlow', sans-serif" }}>
                Everything You Need, Right Here
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={5} sx={{ fontFamily: "'Barlow', sans-serif" }}>
                From tools to insights, JobHub makes your career search simple and successful.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {features.map((feature, index) => (
                    <Grid item key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 5,
                                width: 280,
                                minHeight: 265,
                                borderRadius: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                textAlign: "center",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    backgroundColor: "#e8f0fe",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >
                                {feature.icon}
                            </Box>
                            <Typography variant="subtitle1" sx={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600}} gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500}}>
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CareerFeatures;
