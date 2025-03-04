import React from "react";
import { Box, TextField, Button } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function SocialMediaFields() {
    return (
        <Box display="flex" flexDirection="column" gap={2} sx={{ marginBottom: 4 }}>
            <Box display="flex" alignItems="center" gap={2}>
                <InstagramIcon fontSize="small" sx={{ color: "grey" }} />
                <TextField fullWidth variant="standard" />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <FacebookIcon fontSize="small" sx={{ color: "grey" }} />
                <TextField fullWidth variant="standard" />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <LinkedInIcon fontSize="small" sx={{ color: "grey" }} />
                <TextField fullWidth variant="standard" />
            </Box>
            <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary">
                    Change
                </Button>
            </Box>
        </Box>
    );
}