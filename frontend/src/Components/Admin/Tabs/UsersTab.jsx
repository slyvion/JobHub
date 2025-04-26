import React, {useEffect, useState} from "react";
import UserFilter from "../AdminFilters/UserFilter.jsx";
import Box from "@mui/material/Box";
import {
    CircularProgress,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { fetchAdminUsers } from "../../Services/userServices.js"
import Button from "@mui/material/Button";



export default function UsersTab() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleEdit = (id) => {
        console.log("Edit review", id);
    };

    const handleDelete = (id) => {
        console.log("Delete review", id);
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
                <TableContainer component={Paper} sx={{ mt: 2, maxWidth: 1550, mx: 'auto' }}>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Username</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Role</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(review.id)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={() => handleDelete(review.id)} sx={{ ml: 1 }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
