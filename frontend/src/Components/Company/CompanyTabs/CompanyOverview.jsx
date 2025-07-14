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

            <Typography variant="h5" gutterBottom sx={{ color: 'black', mb: 4, fontSize: '1.5rem', fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
                Company Info
            </Typography>

            <Grid container spacing={3} sx={{ color: 'black' }}>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem', fontFamily: "'Barlow', sans-serif" }}>
                        Name:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        {company.companyName || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem', fontFamily: "'Barlow', sans-serif" }}>
                        Website:
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: 'primary.main', textDecoration: 'underline', fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}
                    >
                        {company.website || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        Location:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        {company.location || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        Offices:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        {company.cities && company.cities.length > 0
                            ? company.cities.join(", ")
                            : "N/A"}
                    </Typography>


                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        Employees:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        {company.employeeNumber || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="500" sx={{ opacity: 0.7, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        Founded:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem', fontFamily: "'Barlow', sans-serif"  }}>
                        {company.founded || "N/A"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Grid>

            </Grid>
        </Box>
    );
}
