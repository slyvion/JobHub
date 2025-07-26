import { Box, Typography, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion';

const MotionGridItem = motion(Grid);

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyUs() {
    return (
        <Box sx={{ paddingBottom: 10}}>
            <Container maxWidth="lg">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                        Why JobHub Stands Out
                    </Typography>
                </motion.div>

                <Grid container spacing={4} sx={{ mt: 2 }}>
                    {[
                        {
                            title: "Integrated Reviews",
                            text: "Employee reviews are part of every company profile — not hidden elsewhere.",
                        },
                        {
                            title: "User-Focused Design",
                            text: "Our UI is built for speed, clarity, and ease of use.",
                        },
                        {
                            title: "Real-World Context",
                            text: "We highlight what actually matters — skills, culture, values, and expectations.",
                        },
                        {
                            title: "Continuous Innovation",
                            text: "We’re constantly improving the platform with new tools and features.",
                        },
                    ].map((item, index) => (
                        <MotionGridItem
                            item
                            xs={12}
                            md={6}
                            key={item.title}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ fontFamily: "'Barlow', sans-serif" }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontFamily: "'Barlow', sans-serif",
                                    fontWeight: 500,
                                }}
                            >
                                {item.text}
                            </Typography>
                        </MotionGridItem>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
