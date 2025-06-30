import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Container
} from "@mui/material";
import AppAppBar from "../../AppAppBar.jsx";
import CvUpload from "./CvUpload";
import { apply } from "../../Services/jobPostServices.js";
import { useUser } from "../../../store/UserContext.jsx";

export default function Apply() {
    const { id: jobPostId } = useParams();
    const { user } = useUser();

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

            const userId = user.id;
            await apply(jobPostId, userId, data);

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
                minHeight: "100vh",
                backgroundColor: "#f0f0f0",
                display: "flex",
                flexDirection: "column",
                pt: { xs: 8, sm: 10 },
            }}
        >
            <AppAppBar />

            <Container
                maxWidth="sm"
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 5,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "100%",
                        p: { xs: 2, sm: 3 },
                        bgcolor: "white",
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={submitting}
                                fullWidth
                            >
                                {submitting ? "Submitting..." : "Apply"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
