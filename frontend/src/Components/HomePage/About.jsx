import { Container, Grid, Stack, Typography, Box, Link } from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import InsightsIcon from "@mui/icons-material/Insights";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import parallax from "../../assets/upscaled2.png";

function AboutUsOption({ iconComponent, content }) {
    return (
        <Box display="flex" alignItems="flex-start" mb={3}>
            <Box sx={{ mr: 2, mt: 0.5, color: "primary.main" }}>
                {iconComponent}
            </Box>
            <Typography variant="body1" color="common.white">
                {content}
            </Typography>
        </Box>
    );
}

export default function About() {
    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                backgroundImage: `url(${parallax})`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                py: { xs: 6, md: 12 },
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                }}
            />
            <Box sx={{ position: "relative", zIndex: 2 }}>
                <Container>
                    <Grid container alignItems="center">
                        <Grid item xs={12} lg={5}>
                            <Typography variant="h3" my={2} sx={{ fontFamily: "Barlow, sans-serif", color: "common.white" }}>
                                About JobHub
                            </Typography>
                            <Typography
                                variant="body1"
                                color="common.white"
                                mb={3}
                                sx={{ fontFamily: "Barlow, sans-serif" }}
                            >
                                JobHub is a platform that connects talented individuals with companies looking
                                to grow their teams. We aim to simplify the hiring process, making it easier
                                for users to find opportunities and for companies to discover top talent.
                            </Typography>
                            <Link
                                href="#"
                                variant="body1"
                                underline="none"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "info.light",
                                    "& svg": {
                                        fontSize: "1.125rem",
                                        transform: "translateX(3px)",
                                        transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                                    },
                                    "&:hover svg": {
                                        transform: "translateX(6px)",
                                    },
                                }}
                            >
                                <Typography sx={{ fontFamily: "Barlow, sans-serif", color: "info.light" }}>
                                    Learn more
                                </Typography>
                                <ArrowForwardIcon sx={{ fontWeight: "bold", ml: 0.5 }} />
                            </Link>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}
                        >
                            <Stack>
                                <AboutUsOption
                                    iconComponent={<ConnectWithoutContactIcon fontSize="medium" />}
                                    content="Bridging the gap between job seekers and companies, ensuring the right people find the right roles."
                                />
                                <AboutUsOption
                                    iconComponent={<InsightsIcon fontSize="medium" />}
                                    content="Helping companies grow by providing tools to post jobs, review applications, and build stronger teams."
                                />
                                <AboutUsOption
                                    iconComponent={<ThumbUpIcon fontSize="medium" />}
                                    content="Empowering users with reviews, company profiles, and insights to make informed career decisions."
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
