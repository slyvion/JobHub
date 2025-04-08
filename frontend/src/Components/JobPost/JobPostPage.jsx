import React, { useEffect, useState } from "react";
import { Box, Typography, Fab, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobPostFilter from "./JobPostFilter.jsx";
import JobPost from "./JobPost.jsx";
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";
import NoJobsFound from "./NoJobsFound.jsx";
import { fetchJobPosts as getJobPosts } from "../Services/jobPostServices.js";
import { useNavigate } from "react-router-dom";
export default function JobPostPage() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleAddJobpost = () => {
        navigate('/createJobpost');
    };
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
                position: "relative",
            }}
        >
            <AppAppBar />

            <Box
                sx={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    paddingTop: "100px",
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

            <Box
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 999,
                }}
            >
                <Fab color="primary" aria-label="add" onClick={handleAddJobpost}>
                    <AddIcon />
                </Fab>
                <Typography variant="caption" sx={{color: 'black'}}mt={1}>
                    Add JobPost
                </Typography>
            </Box>

            <Footer />
        </Box>
    );
}
