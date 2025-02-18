import { Box, Grid, Typography, Divider } from "@mui/material";

export default function CompanyOverview({ company }) {
    return (
        <Box
            sx={{
                background: "white",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                maxWidth: 600,
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ color: 'black', mb: 3 }}>
                Company Info
            </Typography>

            <Grid container spacing={2} sx={{ color: 'black' }}>
                {/* Name */}
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7 }}>
                        Name:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {company.companyName || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                {/* Website */}
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7 }}>
                        Website:
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: 'primary.main', textDecoration: 'underline' }}
                    >
                        {company.website || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                {/* Location */}
                <Grid item xs={12}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7 }}>
                        Location:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {company.location || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>
            </Grid>
        </Box>
    );
}
