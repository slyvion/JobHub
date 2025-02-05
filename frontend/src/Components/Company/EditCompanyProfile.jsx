import React, { useState } from "react";
import { Modal, Box, Button, TextField, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ModalContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
}));

export default function EditCompanyProfile({ open, handleClose, companyData }) {
    const [aboutUs, setAboutUs] = useState(companyData?.description || "");
    const [email, setEmail] = useState(companyData?.email || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveEmail = () => {
        console.log({ email });
    };

    const handleSavePassword = () => {
        console.log({ oldPassword, newPassword, confirmPassword });
    };

    return (
        <Modal open={open} onClose={handleClose}> {/* ne rabote */}
            <ModalContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="About Us"
                            multiline
                            fullWidth
                            value={aboutUs}
                            onChange={(e) => setAboutUs(e.target.value)}
                            variant="outlined"
                        />
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="subtitle1">Company Logo</Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                            />
                            <Button variant="contained" color="primary" onClick={handleSaveEmail}>
                                Update Email
                            </Button>
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <TextField
                            label="Old Password"
                            type="password"
                            fullWidth
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="outlined"
                        />
                        <Box display="flex" justifyContent="flex-start" marginTop={2}>
                            <Button variant="contained" color="primary" onClick={handleSavePassword}>
                                Update Password
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </ModalContainer>
        </Modal>
    );
}
