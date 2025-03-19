import { Box, Grid, Typography, Divider, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

export default function CompanyContact({ company }) {
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
            <Typography variant="h5" gutterBottom sx={{ color: "black", mb: 4, fontSize: "1.5rem" }}>
                Contact Information
            </Typography>

            <Grid container spacing={3} sx={{ color: "black", alignItems: "center" }}>
                <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: "1rem" }}>
                        Phone:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "1rem", paddingTop: '16px',  opacity: 0.7 }}>
                        {company.phoneNumber || "N/A"}
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                </Grid>

                <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="body1" fontWeight="500" sx={{fontSize: "1rem" }}>
                        Email:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "1rem", paddingTop: '16px', opacity: 0.7 }}>
                        {company.email || "N/A"}
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                </Grid>

                <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: "1rem" }}>
                        Social Media:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton component="a"
                                    href={company.linkedinLink && company.linkedinLink.startsWith("http") ? company.linkedinLink : `https://${company.linkedinLink}`}
                                    target="_blank"
                        >
                            <LinkedIn />
                        </IconButton>
                        <IconButton component="a"
                                    href={company.facebookLink && company.facebookLink.startsWith("http") ? company.facebookLink : `https://${company.facebookLink}`}
                                    target="_blank"
                        >
                            <Facebook />
                        </IconButton>
                        <IconButton component="a"
                                    href={company.instagramLink && company.instagramLink.startsWith("http") ? company.instagramLink : `https://${company.instagramLink}`}
                                    target="_blank"
                        >
                            <Instagram />
                        </IconButton>
                    </Box>


                    <Divider sx={{ mt: 2 }} />
                </Grid>
            </Grid>
        </Box>
    );
}
