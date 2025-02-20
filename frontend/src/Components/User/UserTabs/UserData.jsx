import { Box, Typography, TextField, Button, Select, MenuItem } from "@mui/material";

export default function UserData({ user }) {
    return (
        <Box sx={{ maxWidth: "700px", marginLeft: '100px'}}>

            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2, marginBottom: "20px" }}>
                <Typography variant="h6" sx={{color: 'black'}}>Email</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                    <TextField value={user.email} disabled fullWidth size="medium" />
                    <Button variant="contained" size="medium">Change Email</Button>
                </Box>
            </Box>

            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2, marginBottom: "20px" }}>
                <Typography variant="h6" sx={{color: 'black'}}>Change Password</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
                    <TextField label="Old Password" type="password" fullWidth size="medium" />
                    <TextField label="New Password" type="password" fullWidth size="medium" />
                    <TextField label="Confirm Password" type="password" fullWidth size="medium" />
                    <Button variant="contained" size="medium">Change Password</Button>
                </Box>
            </Box>

            <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "30px", paddingLeft: "10px", boxShadow: 2 }}>
                <Typography variant="h6" sx={{color: 'black'}}>Delete Your Profile</Typography>
                <Typography variant="body2" sx={{ color: "gray", marginBottom: "12px" }}>
                    If you no longer wish to have your profile, you can delete it permanently.
                </Typography>
                <Button variant="outlined" size="medium">Delete Profile</Button>
            </Box>
        </Box>
    );
}
