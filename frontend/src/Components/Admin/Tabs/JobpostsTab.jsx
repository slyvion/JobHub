import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";
import { Link } from "react-router-dom";
import JobPostFilter from "../../JobPost/JobPostFilter.jsx";
import {
    fetchJobPosts as getJobPosts,
    deleteJobPost
} from "../../Services/jobPostServices.js";

export default function JobpostsTab() {
    const [jobPosts, setJobPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadJobPosts = async (filterParams = {}, page = 0, size = 15) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getJobPosts(filterParams, page, size);
            setJobPosts(Array.isArray(data.content) ? data.content : []);
            setPagination({
                totalPages: data.totalPages,
                currentPage: data.number,
                totalElements: data.totalElements
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job post?")) return;

        setLoading(true);
        try {
            await deleteJobPost(id);
            await loadJobPosts();
        } catch (err) {
            setError("Failed to delete job post: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <JobPostFilter onFilter={loadJobPosts} />

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
                    No job posts available
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2, maxWidth: 1550, mx: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Job Title</strong></TableCell>
                                <TableCell><strong>Company Name</strong></TableCell>
                                <TableCell><strong>Location</strong></TableCell>
                                <TableCell><strong>Job Type</strong></TableCell>
                                <TableCell><strong>Employment Type</strong></TableCell>
                                <TableCell><strong>Seniority</strong></TableCell>
                                <TableCell><strong>Technologies</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobPosts.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell>
                                        <Link to={`/jobposts/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {job.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/company/${job.company?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {job.company?.companyName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.jobType?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</TableCell>
                                    <TableCell>{job.employmentType?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</TableCell>
                                    <TableCell>{job.seniority?.charAt(0).toUpperCase() + job.seniority.slice(1).toLowerCase()}</TableCell>
                                    <TableCell>{job.tags?.join(', ')}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(job.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
