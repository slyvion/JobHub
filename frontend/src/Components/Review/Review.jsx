import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'date-fns';

export default function Review({ review }) {
    return (
        <Card sx={{
            maxWidth: 600,
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            mb: 2,
            mt: 2,
            p: 2
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <StarIcon sx={{ color: 'gold', fontSize: 20 }} />
                        <Typography variant="body1" sx={{ ml: 0.5 }}>
                            {review.rating}
                        </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ flex: 1, textAlign: 'left' }}>
                        {review.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {format(new Date(review.postDate), 'dd/MM/yyyy')}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 1 }} />

                <Typography variant="body2" sx={{ opacity: 0.7}}>
                    Pros
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    {review.pros|| "The user has not given any Pros"}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.7}}>
                    Cons
                </Typography>
                <Typography variant="body2">
                    {review.cons || "The user has not given any Cons"}
                </Typography>

            </CardContent>
        </Card>
    );
}
