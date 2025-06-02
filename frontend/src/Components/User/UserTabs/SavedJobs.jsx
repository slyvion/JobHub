import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // import useParams
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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getSavedJobPosts, removeSavedJobPost } from "../../Services/userServices.js";

export default function SavedJobPosts() {
    const { userId } = useParams();
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        if (!userId) return;
        const fetchSavedJobs = async () => {
            const jobs = await getSavedJobPosts(userId);
            setSavedJobs(Array.isArray(jobs) ? jobs : []);
        };
        fetchSavedJobs();
    }, [userId]);

    const handleUnsave = async (jobId) => {
        try {
            await removeSavedJobPost(userId, jobId);
            setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        } catch (error) {
            console.error("Error removing job post:", error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 4, padding: 4 }}>
            <Typography variant="h5">Saved Jobposts</Typography>
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
                        savedJobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell><strong>{job.jobPost.company.companyName}</strong></TableCell>
                                <TableCell>{job.jobPost.title}</TableCell>
                                <TableCell>{job.jobPost.seniority}</TableCell>
                                <TableCell>{job.jobPost.employmentType}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleUnsave(job.id)}>
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
    );
}
