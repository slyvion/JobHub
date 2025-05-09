import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function JobApplications() {
    const [applications, setApplications] = useState([]);

    const handleDelete = (applicationId) => {
        setApplications((prev) => prev.filter((app) => app.id !== applicationId));
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 4, padding: 4 }}>
            <Typography variant="h5" gutterBottom>
                Job Applications
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Surname</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Phone</strong></TableCell>
                        <TableCell><strong>LinkedIn</strong></TableCell>
                        <TableCell><strong>Attachment</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications.length > 0 ? (
                        applications.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell>{app.firstName}</TableCell>
                                <TableCell>{app.lastName}</TableCell>
                                <TableCell>{app.email}</TableCell>
                                <TableCell>{app.phoneNumber}</TableCell>
                                <TableCell>{app.linkedinLink}</TableCell>
                                <TableCell>attachment</TableCell>
                                <TableCell>{app.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDelete(app.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No job applications found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
