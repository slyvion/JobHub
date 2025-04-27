import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Tabs, Tab, CircularProgress, Typography } from "@mui/material";
import AppAppBar from "../AppAppBar.jsx";
import CompaniesTab from "./Tabs/CompaniesTab.jsx";
import UsersTab from "./Tabs/UsersTab.jsx";
import ReviewsTab from "./Tabs/ReviewsTab.jsx";
import JobpostsTab from "./Tabs/JobpostsTab.jsx";

export default function Dashboard() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const tabStyle = {
        alignItems: "flex-start",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "16px",
        paddingLeft: "20px",
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                backgroundColor: "#f0f0f0",
                paddingTop: "100px",
            }}
        >
            <AppAppBar />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                }}
            >
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    TabIndicatorProps={{ style: { display: "none" } }}

                    aria-label="Profile Tabs"
                    sx={{ width: "100%", paddingTop: "150px" , paddingLeft: "20px"}}

                >
                    <Tab label="Users" sx={tabStyle} />
                    <Tab label="Companies" sx={tabStyle} />
                    <Tab label="Reviews" sx={tabStyle} />
                    <Tab label="Jobposts" sx={tabStyle} />
                </Tabs>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    width: '100%',
                    overflow: "auto",
                    paddingLeft: "20px",
                }}
            >
                {loading && (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                )}
                {error && <Typography color="error">{error}</Typography>}

                {value === 0 && <UsersTab />}
                {value === 1 && <CompaniesTab />}
                {value === 2 && <ReviewsTab />}
                {value === 3 && <JobpostsTab />}
            </Box>
        </Box>
    );
}
