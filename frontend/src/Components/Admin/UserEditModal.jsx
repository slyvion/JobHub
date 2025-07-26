import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    Typography,
    Divider,
    Grid,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { updateUserRole } from "../Services/userServices.js";

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
    maxWidth: 600,
};

const ROLE_OPTIONS = ["USER", "ADMIN"];

export default function UserEditModal({ open, onClose, user, onSave }) {
    const [role, setRole] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setRole(user.role || "user");
            setError(null);
        }
    }, [user]);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            await updateUserRole(user.id, role);
            onSave({ ...user, role });
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update role");
        } finally {
            setSaving(false);
        }
    };

    if (!user) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box mb={2}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "black",
                            fontSize: "1.5rem",
                            fontFamily: "'Barlow', sans-serif",
                            fontWeight: 500,
                        }}
                    >
                        Edit User Role
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ color: "black" }}>
                    <Grid item xs={6}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>Username:</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{user.username || "N/A"}</Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>Email:</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{user.email || "N/A"}</Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                value={role}
                                label="Role"
                                onChange={(e) => setRole(e.target.value)}
                                sx={{ fontWeight: 500 }}
                                disabled={saving}
                            >
                                {ROLE_OPTIONS.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error">{error}</Typography>
                            <Divider sx={{ my: 2 }} />
                        </Grid>
                    )}

                    <Grid item xs={12} display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={onClose} disabled={saving}>
                            Close
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
                            {saving ? "Saving..." : "Confirm"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
