import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button
} from "@mui/material";
import { fetchAppliedJobs } from "../../Services/userServices.js";
import { useParams, useNavigate } from "react-router-dom";
import { downloadAttachment } from "../../Services/jobPostServices.js"


export default function JobApplications() {
    const [applications, setApplications] = useState([]);
    const { id: userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadApplications = async () => {
            try {
                const data = await fetchAppliedJobs(userId);
                setApplications(data);
            } catch (error) {
                console.error("Error fetching job applications:", error);
            }
        };

        loadApplications();
    }, [userId]);
    return (
        <TableContainer component={Paper} sx={{ maxWidth: 1800, margin: "auto", mt: 4, padding: 4 }}>
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
                        <TableCell><strong>View</strong></TableCell>
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
                                <TableCell>
                                    {app.attachmentFileName ? (
                                        <Button
                                            variant="Text"
                                            size="small"
                                            onClick={() => downloadAttachment(app.applyId)}
                                        >
                                            Download
                                        </Button>
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            No file
                                        </Typography>
                                    )}
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        color:
                                            app.status === 'PENDING' ? 'black' :
                                                app.status === 'DECLINED' ? 'red' :
                                                    app.status === 'ACCEPTED' ? 'green' :
                                                        'inherit',
                                    }}
                                >
                                    {app.status}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => navigate(`/jobposts/${app.jobPostId}`)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} align="center">
                                No job applications found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
