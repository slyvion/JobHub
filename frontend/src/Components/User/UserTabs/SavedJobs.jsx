import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Snackbar
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getSavedJobPosts, removeSavedJobPost } from "../../Services/userServices.js";

export default function SavedJobPosts({ userId }) {
    const [savedJobs, setSavedJobs] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        if (!userId) return;
        const fetchSavedJobs = async () => {
            const jobs = await getSavedJobPosts(userId);
            setSavedJobs(Array.isArray(jobs) ? jobs : []);
        };
        fetchSavedJobs();
    }, [userId]);

    const handleUnsave = async (jobPostId) => {
        try {
            await removeSavedJobPost(userId, jobPostId);
            setSavedJobs((prevJobs) =>
                prevJobs.filter((savedJob) => savedJob.jobPost.id !== jobPostId)
            );
            setSnackbarMessage("Job post removed from saved list.");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error removing job post:", error);
            setSnackbarMessage("Failed to remove job post.");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 4, padding: 4 }}>
                <Typography variant="h5" gutterBottom>Saved Jobposts</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Company Name</strong></TableCell>
                            <TableCell><strong>Position</strong></TableCell>
                            <TableCell><strong>Seniority</strong></TableCell>
                            <TableCell><strong>Employment Type</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {savedJobs.length > 0 ? (
                            savedJobs.map((savedJob) => (
                                <TableRow key={savedJob.jobPost.id}>
                                    <TableCell>
                                        <Link
                                            to={`/company/${savedJob.jobPost.company.id}`}
                                            style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}
                                        >
                                            {savedJob.jobPost.company.companyName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/jobposts/${savedJob.jobPost.id}`}
                                            style={{ textDecoration: "none", color: "#1976d2" }}
                                        >
                                            {savedJob.jobPost.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{savedJob.jobPost.seniority}</TableCell>
                                    <TableCell>{savedJob.jobPost.employmentType}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleUnsave(savedJob.jobPost.id)}>
                                            <FavoriteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No saved job posts.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </>
    );
}
