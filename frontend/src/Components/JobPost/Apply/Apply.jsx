import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import AppAppBar from "../../AppAppBar.jsx";
import CvUpload from "./CvUpload";

export default function Apply() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        linkedinLink: "",
        additionalMessage: "",
        attachment: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (file) => {
        setFormData({ ...formData, attachment: file });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center" }}>

            <AppAppBar />

            <Box sx={{ maxWidth: 500, mx: "auto", p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>

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
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h7" sx={{color: "black", opacity: "0.7"}}>You must insert at least one of the following:</Typography>
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
                        <CvUpload />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            name="additionalMessage"
                            placeholder="additional message to the company"
                            value={formData.additionalMessage}
                            onChange={handleChange}
                        />
                    </Grid>


                    <Grid item xs={12} textAlign="center">
                        <Button variant="contained" color="primary">Apply</Button>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    );
}
