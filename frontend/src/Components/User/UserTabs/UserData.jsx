import { useState } from "react";
import {
    Box, Typography, TextField, Button, Modal
} from "@mui/material";

export default function UserData({ user }) {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

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

    return (
        <Box sx={{ maxWidth: "700px", marginLeft: '100px' }}>
            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2, marginBottom: "20px" }}>
                <Typography variant="h6" sx={{ color: 'black' }}>Email</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                    <TextField value={user.email} disabled fullWidth size="medium" />
                    <Button variant="contained" size="medium">Change Email</Button>
                </Box>
            </Box>

            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2, marginBottom: "20px" }}>
                <Typography variant="h6" sx={{ color: 'black' }}>Change Password</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
                    <TextField label="Old Password" type="password" fullWidth size="medium" />
                    <TextField label="New Password" type="password" fullWidth size="medium" />
                    <TextField label="Confirm Password" type="password" fullWidth size="medium" />
                    <Button variant="contained" size="medium">Change Password</Button>
                </Box>
            </Box>

            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2 }}>
                <Typography variant="h6" sx={{ color: 'black' }}>Delete Your Profile</Typography>
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
                    <Typography variant="h5" sx={{color: 'black'}}>Are you sure you want to delete your profile?</Typography>
                    <Typography variant="body2" sx={{ marginTop: "10px", color: "gray" }}>
                        Enter your current password in order to delete it.
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
                        <Button variant="outlined"  onClick={handleClose}>Close</Button>
                        <Button variant="contained" color="error" disabled={!isPasswordValid}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
