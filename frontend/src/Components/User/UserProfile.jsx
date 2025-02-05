import React, { useState, useEffect } from "react";
import { Avatar, Typography, Paper, Grid, Tabs, Tab, Box, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import Review from '../Review/Review';

const Root = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    position: 'relative',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2),
}));

const UserName = styled(Typography)({
    fontWeight: "bold",
    fontSize: "24px",
});

const TabContent = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

function UserProfile() {
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

        fetchUserData();
        fetchUserReviews();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Root>
            <IconButton
                color="primary"
                aria-label="edit user"
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <Edit />
            </IconButton>

            <Grid container alignItems="center" justifyContent="center">
                <StyledAvatar src={user.image || "/default-user.png"} />
                <UserName>{user.username}</UserName>
            </Grid>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Reviews" />
                <Tab label="Saved JobPosts" />
            </Tabs>
            <TabContent>
                {value === 0 && (
                    <Box>
                        {reviews.length === 0 ? (
                            <Typography>No reviews available</Typography>
                        ) : (
                            reviews.map((review) => (
                                <Review key={review.id} review={review} />
                            ))
                        )}
                    </Box>
                )}
                {value === 1 && <Typography> to be implemented </Typography>}
            </TabContent>
        </Root>
    );
}

export default UserProfile;
