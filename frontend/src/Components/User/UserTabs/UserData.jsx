import React, { useState } from "react";
import {
    Box, Typography, TextField, Button, Modal, Snackbar, Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save.js";
import EditIcon from "@mui/icons-material/Edit.js";
import { updateUserEmail } from "../../Services/userServices.js";

export default function UserData({ user }) {
    const [email, setEmail] = useState(user.email);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleSave = async () => {
        try {
            await updateUserEmail(user.id, email);
            setIsEmailEditable(false);
            setSnackbar({ open: true, message: "Email updated successfully!", severity: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: "Failed to update email.", severity: "error" });
        }
    };

    const handleEdit = () => {
        setIsEmailEditable(true);
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setPassword("");
        setIsPasswordValid(false);
    };

    const handlePasswordChange = (event) => {
        const enteredPassword = event.target.value;
        setPassword(enteredPassword);
        setIsPasswordValid(enteredPassword === user.password);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ maxWidth: "700px", marginLeft: "100px" }}>
            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2, marginBottom: "20px" }}>
                <Typography variant="h6" sx={{ color: "black" }}>Email</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEmailEditable}
                        fullWidth
                        size="medium"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isEmailEditable ? handleSave : handleEdit}
                        size="small"
                    >
                        {isEmailEditable ? <SaveIcon /> : <EditIcon />}
                    </Button>
                </Box>
            </Box>

            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2, marginBottom: "20px" }}>
                <Typography variant="h6" sx={{ color: "black" }}>Change Password</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
                    <TextField label="Old Password" type="password" fullWidth size="medium" />
                    <TextField label="New Password" type="password" fullWidth size="medium" />
                    <TextField label="Confirm Password" type="password" fullWidth size="medium" />
                    <Button variant="contained" size="medium">Change Password</Button>
                </Box>
            </Box>

            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2 }}>
                <Typography variant="h6" sx={{ color: "black" }}>Delete Your Profile</Typography>
                <Typography variant="body2" sx={{ color: "gray", marginBottom: "12px" }}>
                    If you no longer wish to have your profile, you can delete it permanently.
                </Typography>
                <Button variant="outlined" size="medium" onClick={handleOpen}>Delete Profile</Button>
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    width: 600, bgcolor: "white", boxShadow: 24, p: 4, borderRadius: "8px"
                }}>
                    <Typography variant="h5" sx={{ color: "black" }}>Are you sure you want to delete your profile?</Typography>
                    <Typography variant="body2" sx={{ marginTop: "10px", color: "gray" }}>
                        Enter your current password in order to confirm the deletion of your profile.
                    </Typography>
                    <TextField
                        type="password"
                        fullWidth
                        label="Enter your password"
                        sx={{ marginTop: "15px" }}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <Button variant="outlined" onClick={handleClose}>Close</Button>
                        <Button variant="contained" color="error" disabled={!isPasswordValid}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}