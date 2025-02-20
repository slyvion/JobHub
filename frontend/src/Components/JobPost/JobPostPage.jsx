import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import JobPostFilter from "./JobPostFilter.jsx";
import JobPost from "./JobPost.jsx";
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";
import NoJobsFound from "./NoJobsFound.jsx";
export default function JobPostPage() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobPosts = async (filterParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const validParams = Object.entries(filterParams)
                .filter(([key, value]) => value !== undefined && value !== '')
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

            const queryString = new URLSearchParams(validParams).toString();
            const url = `http://localhost:8080/jobposts${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setJobPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobPosts();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#f0f0f0",
            }}
        >
            <AppAppBar />

            <Box
                sx={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    paddingTop: "100px",
                    marginTop: 0,
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <JobPostFilter onFilter={fetchJobPosts} />
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 4 }}>
                {loading ? (
                    <Typography variant="body1">Loading...</Typography>
                ) : error ? (
                    <Typography variant="body1" color="error">
                        Error: {error}
                    </Typography>
                ) : jobPosts.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        <NoJobsFound />
                    </Typography>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        {jobPosts.map((job) => (
                            <Box key={job.id} width="100%" maxWidth="800px">
                                <JobPost job={job} />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            <Footer />
        </Box>
    );
}
