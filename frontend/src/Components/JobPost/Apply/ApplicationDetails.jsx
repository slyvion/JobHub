import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    Typography,
    Divider,
    Grid,
    IconButton,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateApplicantStatus } from "../../Services/jobPostServices.js";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    width: "90%",
    maxWidth: 900,
};

const STATUS_OPTIONS = ["PENDING", "ACCEPTED", "DECLINED"];

export default function ApplicationDetails({ open, handleClose, applicant, jobPostId }) {
    const [status, setStatus] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (applicant) {
            setStatus(applicant.status || "PENDING");
        }
    }, [applicant]);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = applicant.attachmentUrl;
        link.download = applicant.attachmentName || "attachment";
        link.click();
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await updateApplicantStatus(jobPostId, applicant.id, status);
            handleClose();
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setSaving(false);
        }
    };

    if (!applicant) return null;

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="applicant-details-modal">
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "black",
                            fontSize: "1.5rem",
                            fontFamily: "'Barlow', sans-serif",
                            fontWeight: 500,
                        }}
                    >
                        Applicant Info
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Grid container spacing={3} sx={{ color: "black" }}>
                    <Grid item xs={4}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>First Name:</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{applicant.firstName || "N/A"}</Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>Last Name:</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{applicant.lastName || "N/A"}</Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>Email:</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{applicant.email || "N/A"}</Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>Phone:</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{applicant.phoneNumber || "N/A"}</Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
                                sx={{ fontWeight: 500 }}
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>LinkedIn:</Typography>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                color: applicant.linkedinLink ? 'primary.main' : 'inherit',
                                textDecoration: applicant.linkedinLink ? 'underline' : 'none',
                                cursor: applicant.linkedinLink ? 'pointer' : 'default'
                            }}
                            component="a"
                            href={
                                applicant.linkedinLink
                                    ? applicant.linkedinLink.startsWith("http")
                                        ? applicant.linkedinLink
                                        : `https://${applicant.linkedinLink}`
                                    : "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {applicant.linkedinLink ? "View Profile" : "N/A"}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>Message:</Typography>
                        <Typography sx={{ fontWeight: 500 }}>
                            {applicant.message || "N/A"}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="space-between">
                        <Button
                            variant="outlined"
                            onClick={handleDownload}
                            disabled={!applicant.attachmentUrl}
                        >
                            Download Attachment
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Confirm"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
