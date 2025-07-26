import React, { useEffect, useState } from "react";
import UserFilter from "../AdminFilters/UserFilter.jsx";
import Box from "@mui/material/Box";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from "@mui/material";
import { fetchAdminUsers, deleteUser } from "../../Services/userServices.js"
import UserEditModal from "../UserEditModal.jsx";

export default function UsersTab() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingUser, setEditingUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const getUsers = async (filterParams = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAdminUsers(filterParams);
            setUserData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(id);
            setUserData((prev) => prev.filter((user) => user.id !== id));
            console.log("User deleted:", id);
        } catch (err) {
            console.error("Failed to delete user:", err.message);
            setError("Failed to delete user.");
        }
    };

    const handleSave = (updatedUser) => {
        setUserData((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pr: 2 }}>
            <UserFilter onFilter={getUsers} />
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">Error: {error}</Typography>
            ) : userData.length === 0 ? (
                <Typography> No Users</Typography>
            ) : (
                <>
                    <TableContainer
                        component={Paper}
                        sx={{ mt: 2, maxWidth: 1550, mx: "auto" }}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Username</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Email</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Role</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userData.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(user.id)}
                                                sx={{ ml: 1 }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <UserEditModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        user={editingUser}
                        onSave={handleSave}
                    />
                </>
            )}
        </Box>
    );
}
