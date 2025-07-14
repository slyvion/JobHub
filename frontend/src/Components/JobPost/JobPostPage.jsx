import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Typography,
    Pagination,
    Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobPost from "./JobPost.jsx";
import JobPostFilter from "./JobPostFilter.jsx";
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";
import { fetchJobPosts } from "../Services/jobPostServices.js";
import NoJobsFound from "./NoJobsFound.jsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/UserContext.jsx";

export default function JobPostPage() {
    const { user } = useUser();
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentFilter, setCurrentFilter] = useState({});

    const navigate = useNavigate();

    const loadJobPosts = async (filters = currentFilter, pageNum = 0) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchJobPosts(filters, pageNum);
            setJobPosts(data.content);
            setTotalPages(data.totalPages);
            setPage(data.number);
        } catch (err) {
            setError(err.message || "Failed to fetch job posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobPosts();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const handleFilter = (filters) => {
        setCurrentFilter(filters);
        loadJobPosts(filters, 0);
    };

    const handlePageChange = (event, value) => {
        loadJobPosts(currentFilter, value - 1);
    };

    const handleAddJobpost = () => {
        navigate("/createJobpost");
    };

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
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <JobPostFilter onFilter={handleFilter} />
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                }}
            >
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography variant="body1" color="error">
                        Error: {error}
                    </Typography>
                ) : jobPosts.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                        <NoJobsFound />
                    </Box>
                ) : (
                    <>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            {jobPosts.map((job) => (
                                <Box key={job.id} mb={3}>
                                    <JobPost job={job} />
                                </Box>
                            ))}
                        </Box>

                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={totalPages}
                                page={page + 1}
                                shape="rounded"
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Box>

            {user && user.type === 'company' && (
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
                    <Typography
                        variant="caption"
                        sx={{ color: "black", mt: 1 }}
                    >
                        Add JobPost
                    </Typography>
                </Box>
            )}

            <Footer />
        </Box>
    );
}
