import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function Help() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, width: "500px" }}>
                <Typography variant="h6" gutterBottom align="center">
                    Need help?
                    Contact us at <br />
                </Typography>
                <Typography variant="h3" align="center" sx={{ color: "primary.main" }}> help@Jobhub.com </Typography>
                <Typography variant="h6" align="center" sx={{paddingTop: '10px'}}> with subject "<strong>HELP</strong>" <br /></Typography>
                <Typography variant="h6" align="center"> and we will reach with you as soon as possible</Typography>
            </Paper>
        </Box>
    );
}
