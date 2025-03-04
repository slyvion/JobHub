import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import JobPostFilter from "./JobPostFilter.jsx";
import JobPost from "./JobPost.jsx";
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";
import NoJobsFound from "./NoJobsFound.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchJobPosts as getJobPosts } from "../Services/jobPostServices.js";

export default function JobPostPage() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadJobPosts = async (filterParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getJobPosts(filterParams);
            setJobPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobPosts();
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
                <JobPostFilter onFilter={loadJobPosts} />
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 4 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
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
