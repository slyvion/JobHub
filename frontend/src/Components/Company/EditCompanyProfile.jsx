import React, { useEffect, useState } from "react";
import {
    Modal, Box, Button, Divider, Grid, Snackbar, Alert, Typography, IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditableTextField from '../EditableFields/EditableTextField.jsx';
import EditableSelectField from "../EditableFields/EditableSelectField.jsx";
import SocialMediaFields from '../EditableFields/SocialMediaFields.jsx';
import PasswordChange from '../EditableFields/PasswordChange.jsx';
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    updateCompanyBio,
    updateCompanyName,
    updateCompanyWebsite,
    updateCompanyLocation,
    updateCompanyEmail,
    updateCompanyPassword,
    updateCompanyCover,
    updateCompanyEmployeeNumber,
    updateCompanyLogo,
    updateCompanyFounded,
    updateCompanyPhone,
    updateCompanyOffices,
    updateSocialMedia,
} from "../Services/companyServices.js";
import TextField from "@mui/material/TextField";

const ModalContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    maxWidth: "1200px",
    height: "80vh",
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    overflowY: "auto",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

export default function CompanyEdit({ open, handleClose, companyData }) {
    const [isEditing, setIsEditing] = useState({});
    const [companyName, setCompanyName] = useState(companyData?.companyName || "");
    const [description, setDescription] = useState(companyData?.description || "");
    const [location, setLocation] = useState(companyData?.location || "");
    const [phoneNumber, setPhoneNumber] = useState(companyData?.phoneNumber || "");
    const [email, setEmail] = useState(companyData?.email || "");
    const [website, setWebsite] = useState(companyData?.website || "");
    const [employeeNumber, setEmployeeNumber] = useState(companyData?.employeeNumber || "");
    const [founded, setFounded] = useState(companyData?.founded || "");
    const [cities, setCities] = useState(companyData?.cities || []);
    const [facebookLink, setFacebookLink] = useState(companyData?.facebookLink || "");
    const [instagramLink, setInstagramLink] = useState(companyData?.instagramLink || "");
    const [linkedinLink, setLinkedinLink] = useState(companyData?.linkedinLink || "");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [logoFile, setLogoFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    const { id } = useParams();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Set initial logo preview from backend
    useEffect(() => {
        if (!logoPreview && id) {
            setLogoPreview(`http://localhost:8080/company/${id}/getLogo`);
        }
        if (!coverPreview && id) {
            setCoverPreview(`http://localhost:8080/company/${id}/getCover`);
        }
    }, [id, logoPreview, coverPreview]);


    useEffect(() => {
        setCities((companyData?.cities || []).map((city) => ({ city })));
    }, [companyData]);

    useEffect(() => {
        return () => {
            if (logoPreview) URL.revokeObjectURL(logoPreview);
            if (coverPreview) URL.revokeObjectURL(coverPreview);
        };
    }, [logoPreview, coverPreview]);

    const toggleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleUpdate = async (field, value, updateFunction) => {
        try {
            await updateFunction(companyData.id, value);
            showSnackbar(`${field} updated successfully!`);
            setIsEditing((prev) => ({ ...prev, [field]: false }));
        } catch (error) {
            showSnackbar(`Failed to update ${field}.`, "error");
        }
    };

    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            showSnackbar("Passwords do not match", "error");
            return;
        }
        try {
            await updateCompanyPassword(companyData.id, oldPassword, newPassword, confirmPassword);
            showSnackbar("Password updated!");
            setOldPassword(""); setNewPassword(""); setConfirmPassword("");
        } catch {
            showSnackbar("Failed to update password", "error");
        }
    };

    const handleLogoUpload = async () => {
        if (!logoFile) {
            showSnackbar("Please upload a file first.", "error");
            return;
        }

        try {
            await updateCompanyLogo(id, logoFile);
            showSnackbar("Logo updated!");
        } catch (error) {
            console.error(error);
            showSnackbar("Failed to upload logo", "error");
        }
    };

    const handleCoverUpload = async () => {
        if (!coverFile) {
            showSnackbar("Please select a cover file.", "error");
            return;
        }
        try {
            await updateCompanyCover(id, coverFile);
            showSnackbar("Cover updated!");
        } catch (error) {
            console.error(error);
            showSnackbar("Failed to upload cover", "error");
        }
    };

    const handleAddOffice = () => {
        setCities([...cities, { city: "" }]);
    };

    const handleOfficeChange = (index, value) => {
        const updatedCities = [...cities];
        updatedCities[index].city = value;
        setCities(updatedCities);
    };

    const handleRemoveOffice = (index) => {
        setCities(cities.filter((_, i) => i !== index));
    };

    const handleSaveOffices = async () => {
        try {
            const cityNames = cities.map(city => city.city.trim()).filter(name => name);
            await updateCompanyOffices(companyData.id, cityNames);
            showSnackbar("Offices updated!");
        } catch {
            showSnackbar("Failed to update offices", "error");
        }
    };

    const handleSocialMediaUpdate = async () => {
        try {
            await updateSocialMedia(companyData.id, instagramLink, facebookLink, linkedinLink);
            showSnackbar("Social media links updated!");
        } catch {
            showSnackbar("Failed to update social links", "error");
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <ModalContainer>
                    <Grid container spacing={2}>
                        {/* First Column */}
                        <Grid item xs={4}>
                            <EditableTextField label="Company Name" value={companyName}
                                               onChange={(e) => setCompanyName(e.target.value)}
                                               isEditable={isEditing.companyName}
                                               onEdit={() => toggleEdit("companyName")}
                                               onSave={() => handleUpdate("companyName", companyName, updateCompanyName)}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <EditableTextField label="About Us" value={description}
                                               onChange={(e) => setDescription(e.target.value)}
                                               isEditable={isEditing.description}
                                               onEdit={() => toggleEdit("description")}
                                               onSave={() => handleUpdate("description", description, updateCompanyBio)}
                                               multiline fullWidth
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                                <img
                                    src={logoPreview}
                                    alt="Company Logo"
                                    style={{ width: 150, height: 150, objectFit: 'cover' }}
                                />
                            </Box>
                            <Box sx={{ paddingLeft: "40px" }}>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Upload logo
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setLogoFile(file);
                                                const previewUrl = URL.createObjectURL(file);
                                                setLogoPreview(previewUrl);
                                            }
                                        }}
                                    />
                                </Button>
                                <Button variant="contained" color="success" onClick={handleLogoUpload} sx={{ ml: 1 }}>
                                    Confirm
                                </Button>
                            </Box>

                            <Divider sx={{ marginY: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                                <img
                                    src={coverPreview}
                                    alt="Company Cover"
                                    style={{ width: 400, height: 150, objectFit: 'cover', borderRadius: 8 }}
                                />

                            </Box>
                            <Box sx={{ paddingLeft: "40px" }}>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Upload cover
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setCoverFile(file);
                                                setCoverPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </Button>
                                <Button variant="contained" color="success" onClick={handleCoverUpload} sx={{ ml: 1 }}>
                                    Confirm
                                </Button>
                            </Box>
                        </Grid>

                        {/* Second Column */}
                        <Grid item xs={4}>
                            <EditableTextField label="Email" value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               isEditable={isEditing.email}
                                               onEdit={() => toggleEdit("email")}
                                               onSave={() => handleUpdate("email", email, updateCompanyEmail)}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <EditableTextField label="Website" value={website}
                                               onChange={(e) => setWebsite(e.target.value)}
                                               isEditable={isEditing.website}
                                               onEdit={() => toggleEdit("website")}
                                               onSave={() => handleUpdate("website", website, updateCompanyWebsite)}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <EditableTextField label="Phone Number" value={phoneNumber}
                                               onChange={(e) => setPhoneNumber(e.target.value)}
                                               isEditable={isEditing.phoneNumber}
                                               onEdit={() => toggleEdit("phoneNumber")}
                                               onSave={() => handleUpdate("phoneNumber", phoneNumber, updateCompanyPhone)}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <EditableTextField label="Location" value={location}
                                               onChange={(e) => setLocation(e.target.value)}
                                               isEditable={isEditing.location}
                                               onEdit={() => toggleEdit("location")}
                                               onSave={() => handleUpdate("location", location, updateCompanyLocation)}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <EditableSelectField label="Number of Employees" value={employeeNumber}
                                                 onChange={(e) => setEmployeeNumber(e.target.value)}
                                                 options={[
                                                     { value: "<20", label: " <20 " },
                                                     { value: "21-50", label: "21-50" },
                                                     { value: "51-100", label: "51-100" },
                                                     { value: "101-300", label: "101-300" },
                                                     { value: "301-500", label: "301-500" },
                                                     { value: "500+", label: "500+" },
                                                 ]}
                                                 isEditable={isEditing.employeeNumber}
                                                 onEdit={() => toggleEdit("employeeNumber")}
                                                 onSave={() => handleUpdate("employeeNumber", employeeNumber, updateCompanyEmployeeNumber)}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <EditableSelectField label="Year Founded" value={founded}
                                                 onChange={(e) => setFounded(e.target.value)}
                                                 options={years.map(year => ({ value: year, label: year }))}
                                                 isEditable={isEditing.founded}
                                                 onEdit={() => toggleEdit("founded")}
                                                 onSave={() => handleUpdate("founded", founded, updateCompanyFounded)}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <Typography variant="h6" sx={{ color: 'black', paddingLeft: '140px', opacity: '0.8' }}>Offices</Typography>
                            {cities.map((city, index) => (
                                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        label={`Office ${index + 1}`}
                                        value={city.city}
                                        onChange={(e) => handleOfficeChange(index, e.target.value)}
                                    />
                                    <IconButton onClick={() => handleRemoveOffice(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button variant="contained" color="primary" onClick={handleAddOffice} sx={{ mt: 1 }}>
                                Add Office
                            </Button>
                            <Button variant="contained" color="success" onClick={handleSaveOffices} sx={{ mt: 1, ml: 1 }}>
                                Save Offices
                            </Button>
                        </Grid>

                        {/* Third Column */}
                        <Grid item xs={4}>
                            <SocialMediaFields
                                instagramLink={instagramLink}
                                facebookLink={facebookLink}
                                linkedinLink={linkedinLink}
                                onInstagramChange={(e) => setInstagramLink(e.target.value)}
                                onFacebookChange={(e) => setFacebookLink(e.target.value)}
                                onLinkedInChange={(e) => setLinkedinLink(e.target.value)}
                                onSocialMediaUpdate={handleSocialMediaUpdate}
                            />

                            <Divider sx={{ marginY: 2 }} />

                            <PasswordChange
                                oldPassword={oldPassword}
                                newPassword={newPassword}
                                confirmPassword={confirmPassword}
                                onOldPasswordChange={(e) => setOldPassword(e.target.value)}
                                onNewPasswordChange={(e) => setNewPassword(e.target.value)}
                                onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                                onPasswordChange={handlePasswordUpdate}
                            />
                        </Grid>
                    </Grid>
                </ModalContainer>
            </Modal>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
