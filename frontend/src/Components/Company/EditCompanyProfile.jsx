import React, { useState } from "react";
import { Modal, Box, Button, TextField, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { visuallyHidden } from "@mui/utils";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

const ModalContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    maxWidth: "800px",
    height: "80vh",
    maxHeight: "80vh",
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    overflowY: "auto",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const VisuallyHiddenInput = styled("input")({
    ...visuallyHidden,
});

export default function EditCompanyProfile({ open, handleClose, companyData }) {
    const [companyName, setCompanyName] = useState(companyData?.companyName || "");
    const [aboutUs, setAboutUs] = useState(companyData?.description || "");
    const [location, setLocation] = useState(companyData?.location || "");
    const [email, setEmail] = useState(companyData?.email || "");
    const [website, setWebsite] = useState(companyData?.website || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isCompanyNameEditable, setIsCompanyNameEditable] = useState(false);
    const [isWebsiteEditable, setIsWebsiteEditable] = useState(false);
    const [isAboutUsEditable, setIsAboutUsEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isLocationEditable, setIsLocationEditable] = useState(false);

    const handleSave = () => {
        // Disable editing after save
        setIsCompanyNameEditable(false);
        setIsAboutUsEditable(false);
        setIsEmailEditable(false);
        setIsLocationEditable(false);
        setIsWebsiteEditable(false);
    };

    const handleEdit = (field) => {
        if (field === "companyName") setIsCompanyNameEditable(true);
        if (field === "aboutUs") setIsAboutUsEditable(true);
        if (field === "email") setIsEmailEditable(true);
        if (field === "location") setIsLocationEditable(true);
        if (field === "website") setIsWebsiteEditable(true);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalContainer>
                <Grid container spacing={2}>
                    {/* Left Side */}
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                            <TextField
                                label="Company Name"
                                fullWidth
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                variant="outlined"
                                disabled={!isCompanyNameEditable}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => (isCompanyNameEditable ? handleSave() : handleEdit("companyName"))}
                                size="small"
                            >
                                {isCompanyNameEditable ? <SaveIcon /> : <EditIcon />}
                            </Button>
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                            <TextField
                                label="About Us"
                                multiline
                                fullWidth
                                value={aboutUs}
                                onChange={(e) => setAboutUs(e.target.value)}
                                variant="outlined"
                                disabled={!isAboutUsEditable}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => (isAboutUsEditable ? handleSave() : handleEdit("aboutUs"))}
                                size="small"
                            >
                                {isAboutUsEditable ? <SaveIcon /> : <EditIcon />}
                            </Button>
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <Box
                            component="img"
                               sx={{
                                   height: 233,
                                   width: 350,
                                   maxHeight: { xs: 233, md: 167 },
                                   maxWidth: { xs: 233, md: 167 },
                                   marginBottom: 1,
                                   marginLeft: 10
                               }}>
                        </Box>
                        <Button component="label" variant="contained" sx={{marginLeft: 5}} startIcon={<CloudUploadIcon />}>
                            Upload logo
                            <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
                        </Button>
                        <Button variant="contained" color="success" sx={{ marginX: 1 }}>Confirm</Button>
                        <Divider sx={{ marginY: 2 }} />
                        <Box
                            component="img"
                            sx={{
                                height: 233,
                                width: 350,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 233, md: 400 },
                                marginBottom: 1
                            }}>
                        </Box>
                        <Button component="label" variant="contained" sx={{marginLeft: 4}} startIcon={<CloudUploadIcon />}>
                            Upload cover
                            <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
                        </Button>
                        <Button variant="contained" color="success" sx={{ marginX: 1 }}>Confirm</Button>
                    </Grid>

                    {/* Right Side */}
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                disabled={!isEmailEditable}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => (isEmailEditable ? handleSave() : handleEdit("email"))}
                                size="small"
                            >
                                {isEmailEditable ? <SaveIcon /> : <EditIcon />}
                            </Button>
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                            <TextField
                                label="Website"
                                fullWidth
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                variant="outlined"
                                disabled={!isWebsiteEditable}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => (isWebsiteEditable ? handleSave() : handleEdit("website"))}
                                size="small"
                            >
                                {isWebsiteEditable ? <SaveIcon /> : <EditIcon />}
                            </Button>
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                            <TextField
                                label="Location"
                                fullWidth
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                variant="outlined"
                                disabled={!isLocationEditable}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => (isLocationEditable ? handleSave() : handleEdit("location"))}
                                size="small"
                            >
                                {isLocationEditable ? <SaveIcon /> : <EditIcon />}
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
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" color="primary">
                                Update Password
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </ModalContainer>
        </Modal>
    );
}
