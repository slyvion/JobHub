import { Box, Grid, Typography, Divider } from "@mui/material";

export default function CompanyOverview({ company }) {
    return (
        <Box
            sx={{
                background: "white",
                borderRadius: 2,
                boxShadow: 1,
                p: 4,
                maxWidth: 900,
                width: "100%",
            }}
        >

            <Typography variant="h5" gutterBottom sx={{ color: 'black', mb: 4, fontSize: '1.5rem' }}>
                Company Info
            </Typography>

            <Grid container spacing={3} sx={{ color: 'black' }}>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem' }}>
                        Name:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {company.companyName || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem' }}>
                        Website:
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: 'primary.main', textDecoration: 'underline', fontSize: '1rem' }}
                    >
                        {company.website || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem' }}>
                        Location:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {company.location || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem' }}>
                        Offices:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {company.offices || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem' }}>
                        Employees:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {company.employeeNumber || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem' }}>
                        Founded:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {company.founded || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

            </Grid>
        </Box>
    );
}
