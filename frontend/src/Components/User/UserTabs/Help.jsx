import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function Help() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, width: "400px" }}>
                <Typography variant="h6" gutterBottom>
                    How can we help you?
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Your Question"
                        name="question"
                        multiline
                        rows={4}
                        margin="normal"
                        required
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}