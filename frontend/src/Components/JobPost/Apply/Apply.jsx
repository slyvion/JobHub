import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import AppAppBar from "../../AppAppBar.jsx";
import CvUpload from "./CvUpload";
import { apply } from "../../Services/jobPostServices.js";

export default function Apply() {
    const { id: jobPostId } = useParams();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        linkedinLink: "",
        additionalMessage: "",
        attachment: null,
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (file) => {
        setFormData({ ...formData, attachment: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const applyDto = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                linkedinLink: formData.linkedinLink,
                additionalMessage: formData.additionalMessage,
            };

            const data = new FormData();
            data.append("applyDto", new Blob([JSON.stringify(applyDto)], { type: "application/json" }));

            if (formData.attachment) {
                data.append("file", formData.attachment);
            }

            await apply(jobPostId, data);

            setSuccessMsg("Application submitted successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                linkedinLink: "",
                additionalMessage: "",
                attachment: null,
            });
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#f0f0f0",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <AppAppBar />

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: 500,
                    mx: "auto",
                    p: 3,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            required
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ color: "black", opacity: 0.7 }}>
                            You must insert at least one of the following:
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="LinkedIn Profile"
                            name="linkedinLink"
                            value={formData.linkedinLink}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CvUpload onFileChange={handleFileChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            name="additionalMessage"
                            placeholder="Additional message to the company"
                            value={formData.additionalMessage}
                            onChange={handleChange}
                        />
                    </Grid>

                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error" align="center">
                                {error}
                            </Typography>
                        </Grid>
                    )}

                    {successMsg && (
                        <Grid item xs={12}>
                            <Typography color="success.main" align="center">
                                {successMsg}
                            </Typography>
                        </Grid>
                    )}

                    <Grid item xs={12} textAlign="center">
                        <Button type="submit" variant="contained" color="primary" disabled={submitting}>
                            {submitting ? "Submitting..." : "Apply"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
