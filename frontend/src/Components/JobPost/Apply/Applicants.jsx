import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getApplicantsByJobPostId } from "../../Services/jobPostServices.js";
import ApplicationDetails from "./ApplicationDetails";

export default function Applicants() {
    const { id: jobPostId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const data = await getApplicantsByJobPostId(jobPostId);
                setApplicants(data);
            } catch (error) {
                console.error("Failed to fetch applicants", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobPostId]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewDetails = (applicant) => {
        setSelectedApplicant(applicant);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedApplicant(null);
        setModalOpen(false);
    };

    return (
        <Box sx={{ p: 4, backgroundColor: "#fff", minHeight: "100vh" }}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
                    Applicants
                </Typography>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : applicants.length === 0 ? (
                <Typography variant="body1" mt={3} sx={{ color: "black" }}>
                    No applicants yet.
                </Typography>
            ) : (
                <Paper sx={{ backgroundColor: "#fff" }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applicants
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((applicant, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{applicant.firstName}</TableCell>
                                            <TableCell>{applicant.lastName}</TableCell>
                                            <TableCell>{applicant.email}</TableCell>
                                            <TableCell>{applicant.phoneNumber}</TableCell>
                                            <TableCell>{applicant.status}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleViewDetails(applicant)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={applicants.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Paper>
            )}

            {/* Modal for applicant details */}
            <ApplicationDetails
                open={modalOpen}
                handleClose={handleCloseModal}
                applicant={selectedApplicant}
                jobPostId={jobPostId}
            />


        </Box>
    );
}
