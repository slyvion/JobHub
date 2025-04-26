import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router
import JobPostFilter from "../../JobPost/JobPostFilter.jsx";
import { fetchJobPosts as getJobPosts } from "../../Services/jobPostServices.js";
import Button from "@mui/material/Button";

export default function JobpostsTab() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(false);
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

    const handleEdit = (id) => {
        console.log("Edit review", id);
    };

    const handleDelete = (id) => {
        console.log("Delete review", id);
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
                                        <Link to={`/company/${job.company.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {job.company.companyName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.jobType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</TableCell>
                                    <TableCell>{job.employmentType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</TableCell>
                                    <TableCell>{job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1).toLowerCase()}</TableCell>
                                    <TableCell>{job.tags.join(', ')}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(review.id)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={() => handleDelete(review.id)} sx={{ ml: 1 }}>
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
