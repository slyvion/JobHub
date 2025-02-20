import React, { useState, useEffect } from "react";
import { Avatar, Typography, Paper, Box, Tabs, Tab, Button, IconButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import Review from "../Review/Review.jsx";
import JobPost from "../JobPost/JobPost.jsx";
import { useParams, useNavigate } from "react-router-dom";
import EditCompanyProfile from "./EditCompanyProfile";
import CompanyCover from "./CompanyCover.jsx";
import Footer from "../HomePage/Footer.jsx";
import AppAppBar from "../AppAppBar.jsx";
import CompanyOverview from "./CompanyTabs/CompanyOverview.jsx"
import AboutUs from "./CompanyTabs/AboutUs.jsx";




const Root = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(1),
    position: "relative",
    boxShadow: "none",
}));

const LogoContainer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(14),
    height: theme.spacing(14),
    borderRadius: "4px",
    boxShadow: `0 0 3px 1px rgba(0, 123, 255, 0.6)`,
}));


const CompanyInfo = styled(Box)(({ theme }) => ({
    marginLeft: theme.spacing(2),
}));

const EditButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(8),
    right: theme.spacing(5),
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddReviewClick = () => {
        navigate(`/company/${id}/add-review`);
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

        Promise.all([fetchCompanyData(), fetchJobPosts(), fetchReviews()]).finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <CircularProgress style={{ width: '10rem', height: '10rem' }} />
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ backgroundColor: '#FFF', minHeight: '100vh'}}>
            <AppAppBar />
            <CompanyCover image={company.companyCover || "/companyLogo.jpg"} />
            <Root>
                <EditButton onClick={handleEditClick}>
                    <EditIcon />
                </EditButton>

                <LogoContainer>
                    <StyledAvatar src={company.image || "/joblogo.jpg"} variant="square" />
                    <CompanyInfo>
                        <Typography variant="h5" fontWeight="bold">{company.companyName}</Typography>
                        <Typography>{company.location}</Typography>
                        <Box display="flex" alignItems="center">
                            <StarIcon sx={{ color: "#FFD700" }} />
                            <Typography>{company.rating || "N/A"}</Typography>
                        </Box>
                    </CompanyInfo>
                </LogoContainer>
            </Root>

                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{ style: { backgroundColor: "blue" } }}
                    >
                        <Tab label="About Us" sx={{ minWidth: 300 }} />
                        <Tab label="JobPosts" sx={{ minWidth: 300 }} />
                        <Tab label="Reviews" sx={{ minWidth: 300 }} />
                    </Tabs>
                </Box>
                <Box sx={{ backgroundColor: "#F5F5F5", padding: 2, width: "100%", minHeight: "60vh" }}>
                    <Box>
                        {value === 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', margin: 2, gap: 2 , alignItems: 'center'}}>
                                <CompanyOverview company={company} />
                                <AboutUs company={company} />
                            </Box>
                        )}


                        {value === 1 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', margin: 2, gap: 2 , alignItems: 'center'}}>
                                {jobPosts.length > 0 ? (
                                    jobPosts.map((job) => <JobPost key={job.id} job={job} />)
                                ) : (
                                    <Typography>No job posts available</Typography>
                                )}
                            </Box>
                        )}

                        {value === 2 && (
                            <Box sx={{ margin: 2, gap: 2 }}>
                                {reviews.length > 0 ? (
                                    reviews.map((review) => <Review key={review.id} review={review} />)
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
                    </Box>
                </Box>

                <EditCompanyProfile open={isModalOpen} handleClose={handleCloseModal} companyData={company} />
            <Footer />
        </div>
    );
}

export default CompanyProfile;
