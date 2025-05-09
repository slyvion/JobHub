import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Review from "../../Review/Review.jsx"

export default function UserReviews({ reviews, loading, error }) {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: 2,
                width: "100%",
                maxWidth: "700px",
                marginLeft: 'auto',
                marginRight: 'auto',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    marginBottom: "20px",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                Your Reviews
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : !reviews || reviews.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    You have not written any reviews yet.
                </Typography>
            ) : (
                reviews.map((review) => <Review key={review.id} review={review} />)
            )}
        </Box>
    );
}
