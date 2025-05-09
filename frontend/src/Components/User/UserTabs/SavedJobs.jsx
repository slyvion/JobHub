import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton, Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SavedJobPosts = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId") || 1;
        fetch(`http://localhost:8080/user/${userId}/saved-jobposts`)
            .then((response) => response.json())
            .then((data) => {
                setSavedJobs(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("Error fetching saved jobs:", error);
                setSavedJobs([]);
            });
    }, []);

    const handleUnsave = async (jobId) => {
        try {
            const userId = localStorage.getItem("userId") || 1;
            const response = await fetch(`http://localhost:8080/user/${userId}/removeJob/${jobId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to remove job post");

            setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        } catch (error) {
            console.error("Error removing job post:", error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 4 , padding: 4 }}>
            <Typography variant="h5"> Saved Jobposts</Typography>
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
                                <TableCell><strong>{job.companyName}</strong></TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.seniority}</TableCell>
                                <TableCell>{job.employmentType}</TableCell>
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
};

export default SavedJobPosts;
