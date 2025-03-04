import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function PasswordChange({
                                           oldPassword,
                                           newPassword,
                                           confirmPassword,
                                           onOldPasswordChange,
                                           onNewPasswordChange,
                                           onConfirmPasswordChange,
                                           onPasswordChange
                                       }) {
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        onPasswordChange();
    };

    return (
        <Box>
            <TextField
                label="Old Password"
                type="password"
                fullWidth
                value={oldPassword}
                onChange={onOldPasswordChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
                error={!!error && !oldPassword}
                helperText={!oldPassword && error ? "Old password is required." : ""}
            />
            <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={onNewPasswordChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
                error={!!error && (newPassword.length < 8 || newPassword !== confirmPassword)}
                helperText={
                    newPassword.length < 8
                        ? "Password must be at least 8 characters."
                        : newPassword !== confirmPassword
                            ? "Passwords do not match."
                            : ""
                }
            />
            <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                variant="outlined"
                error={!!error && newPassword !== confirmPassword}
                helperText={newPassword !== confirmPassword ? "Passwords do not match." : ""}
            />
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 8}
                >
                    Update Password
                </Button>
            </Box>
        </Box>
    );
}
