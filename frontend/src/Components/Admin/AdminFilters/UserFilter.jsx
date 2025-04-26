import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function UserFilter({ onFilter }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = () => {
        const filterParams = {
            username: username || undefined,
            email: email || undefined,
            role: role || undefined,
        };

        const params = {};
        if (username) params.username = username;
        if (email) params.email = email;
        if (role) params.role = role;

        setSearchParams(params);
        onFilter(filterParams);
    };

    useEffect(() => {
        const usernameParam = searchParams.get('username') ?? '';
        const emailParam = searchParams.get('email') ?? '';
        const roleParam = searchParams.get('role') ?? '';

        setUsername(usernameParam);
        setEmail(emailParam);
        setRole(roleParam);

        onFilter({
            username: usernameParam || undefined,
            email: emailParam || undefined,
            role: roleParam || undefined,
        });
    }, []);

    return (
        <Box sx={{ width: '100%', backgroundColor: '#fff', padding: '16px', display: 'flex', gap: 1, justifyContent: 'center' }}>
            <TextField
                label="Username"
                variant="outlined"
                sx={{ width: '300px' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                sx={{ width: '300px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                    label="Role"
                    value={role}
                    sx={{ width: '200px' }}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" fullWidth onClick={handleFilter} sx={{ width: '90px' }}>
                Filter
            </Button>
        </Box>
    );
}
