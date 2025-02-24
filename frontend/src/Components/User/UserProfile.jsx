import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppAppBar from "../AppAppBar.jsx";
import { Box, Tabs, Tab, Typography, Avatar, CircularProgress } from "@mui/material";
import Footer from "../HomePage/Footer.jsx";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import UserData from "./UserTabs/UserData.jsx";
import UserReviews from "./UserTabs/UserReviews.jsx";
import SavedJobs from "./UserTabs/SavedJobs.jsx";
import Help from "./UserTabs/Help.jsx";

function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchUserReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/user/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user reviews");
                }
                const data = await response.json();
                setReviews(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUserReviews();
        fetchUserData();
    }, [id]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center" }}>
            <AppAppBar />

            <Box
                sx={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    paddingTop: "100px",
                    marginTop: 0,
                    position: "relative",
                    zIndex: 10,
                    width: 1,
                }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "30px", width: "100%", maxWidth: "1200px"}}>
                <Box sx={{ display: "flex", alignItems: "center", paddingLeft: '90px'}}>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <>
                            <Avatar src={user?.profilePicture} sx={{ width: 100, height: 100 }} />
                            <Typography variant="h5" sx={{ paddingLeft: "30px", color: "black" }}>
                                {user?.username}
                            </Typography>
                        </>
                    )}
                </Box>

                <Box sx={{ display: "flex", paddingTop: "20px", width: "100%" }}>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={(event, newValue) => setValue(newValue)}
                        aria-label="User Profile Tabs"
                        sx={{ width: "250px", paddingLeft: "0px" }}
                    >
                        <Tab icon={<PersonIcon />} iconPosition="start" label="User Data" sx={tabStyle} />
                        <Tab icon={<WorkIcon />} iconPosition="start" label="JobPosts" sx={tabStyle} />
                        <Tab icon={<RateReviewIcon />} iconPosition="start" label="Reviews" sx={tabStyle} />
                        <Tab icon={<HelpOutlineIcon />} iconPosition="start" label="Help" sx={tabStyle} />
                    </Tabs>

                    <Box sx={{ flex: 1 }}>
                        {value === 0 && user && <UserData user={user} />}
                        {value === 1 && <Typography> <SavedJobs /> </Typography>}
                        {value === 2 && <UserReviews reviews={reviews} />}
                        {value === 3 && <Typography> <Help /></Typography>}
                    </Box>
                </Box>
            </Box>

            <Footer />
        </Box>
    );
}

const tabStyle = {
    textTransform: "none",
    color: "black",
    ":hover": { color: "primary.main" },
};

export default UserProfile;
