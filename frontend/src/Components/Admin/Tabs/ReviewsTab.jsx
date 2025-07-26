import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import ReviewsFilter from "../AdminFilters/ReviewsFilter.jsx";
import {fetchAdminReviews, deleteReview} from "../../Services/reviewServices.js";
import Button from "@mui/material/Button";

export default function ReviewsTab() {
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getReviews = async (filterParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchAdminReviews(filterParams);
            setReviewData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getReviews();
    }, []);

    const handleEdit = (id) => {
        console.log("Edit review", id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            await deleteReview(id);
            setReviewData(prev => prev.filter(review => review.id !== id));
        } catch (err) {
            console.error('Failed to delete review:', err);
            alert('Failed to delete review.');
        }
    };

    return (
        <Box>
             <ReviewsFilter onFilter={getReviews} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">Error: {error}</Typography>
            ) : reviewData.length === 0 ? (
                <Typography> No Reviews Found</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2, maxWidth: 1550, mx: 'auto' }}>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Company Name</strong></TableCell>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell><strong>User</strong></TableCell>
                                <TableCell><strong>Rating</strong></TableCell>
                                <TableCell><strong>Post Date</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviewData.map((review, index) => (
                                <TableRow key={index}>
                                    <TableCell>{review.company.companyName}</TableCell>
                                    <TableCell>{review.title}</TableCell>
                                    <TableCell>{review.user.username}</TableCell>
                                    <TableCell>{review.rating}</TableCell>
                                    <TableCell>{review.postDate.slice(0, 10)}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" size="small" onClick={() => handleDelete(review.id)} sx={{ ml: 1 }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
