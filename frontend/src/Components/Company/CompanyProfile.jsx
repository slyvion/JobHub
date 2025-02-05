import { useState, useEffect } from "react";
import { Avatar, Typography, Paper, Grid, Tabs, Tab, Box, Button, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import Review from '../Review/Review.jsx';
import JobPost from '../JobPost/JobPost.jsx';
import { useParams, useNavigate } from "react-router-dom";

const Root = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    position: "relative", // Add relative positioning to contain the button
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2),
}));

const CompanyName = styled(Typography)({
    fontWeight: "bold",
    fontSize: "24px",
});

const Details = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
}));

const Rating = styled(Grid)({
    display: "flex",
    alignItems: "center",
});

const Location = styled(Grid)({
    display: "flex",
    alignItems: "center",
});

const TabContent = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const EditButton = styled(IconButton)(({ theme }) => ({
    position: "absolute", // Position it in the top-right corner
    top: theme.spacing(1),
    right: theme.spacing(1),
}));

function CompanyProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [company, setCompany] = useState(null);
    const [jobPosts, setJobPosts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddReviewClick = () => {
        navigate(`/company/${id}/add-review`);
    };

    const handleEditClick = () => {
        console.log("Edit button clicked");
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/company/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch company data");
                }
                const data = await response.json();
                setCompany(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchJobPosts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/jobposts/company/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch job posts");
                }
                const data = await response.json();
                setJobPosts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/company/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch reviews");
                }
                const data = await response.json();
                setReviews(data);
            } catch (err) {
                setError(err.message);
            }
        };

        Promise.all([fetchCompanyData(), fetchJobPosts(), fetchReviews()])
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Root>
            <EditButton onClick={handleEditClick}>
                <EditIcon />
            </EditButton>

            <Grid container alignItems="center" justifyContent="center">
                <StyledAvatar src={company.image || "/joblogo.jpg"} />
                <CompanyName>{company.companyName}</CompanyName>
            </Grid>
            <Details container>
                <Rating item>
                    <StarIcon sx={{ color: '#FFD700' }} />
                    <Typography>{company.rating || 'N/A'}</Typography>
                </Rating>
                <Location item>
                    <Typography>{company.location}</Typography>
                </Location>
            </Details>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="About Us" />
                <Tab label="JobPosts" />
                <Tab label="Reviews" />
            </Tabs>
            <TabContent>
                {value === 0 && <Typography>{company.description}</Typography>}

                {value === 1 && (
                    <Box>
                        {jobPosts.length > 0 ? (
                            jobPosts.map((job) => (
                                <JobPost key={job.id} job={job} />
                            ))
                        ) : (
                            <Typography>No job posts available</Typography>
                        )}
                    </Box>
                )}

                {value === 2 && (
                    <Box>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Review key={review.id} review={review} />
                            ))
                        ) : (
                            <Typography>No reviews available</Typography>
                        )}
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="contained" color="primary" onClick={handleAddReviewClick}>
                                Add Review
                            </Button>
                        </Box>
                    </Box>
                )}
            </TabContent>
        </Root>
    );
}

export default CompanyProfile;
