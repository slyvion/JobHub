import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'date-fns';

export default function Review({ review }) {
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const isoString = dateString.replace(' ', 'T');
        const dateObj = new Date(isoString);
        return isNaN(dateObj) ? null : dateObj;
    };

    const postDateObj = parseDate(review.postDate);

    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 600,
                border: '1px solid #ddd',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                mb: 2,
                mt: 2,
                p: 2,
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <StarIcon sx={{ color: 'gold', fontSize: 20 }} />
                        <Typography variant="body1" sx={{ ml: 0.5, fontFamily: "'Barlow', sans-serif" , fontWeight: 500 }}>
                            {review.rating}
                        </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ flex: 1, textAlign: 'left', fontFamily: "'Barlow', sans-serif"  }}>
                        {review.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
                        {postDateObj ? format(postDateObj, 'dd/MM/yyyy') : 'Date unknown'}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 1 }} />

                <Typography variant="body2" sx={{ opacity: 0.7 , fontFamily: "'Barlow', sans-serif" , fontWeight: 500}}>
                    Pros
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontFamily: "'Barlow', sans-serif" , fontWeight: 500 }}>
                    {review.pros || 'The user has not given any Pros'}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.7 , fontFamily: "'Barlow', sans-serif" , fontWeight: 500}}>
                    Cons
                </Typography>
                <Typography variant="body2" sx={{fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
                    {review.cons || 'The user has not given any Cons'}
                </Typography>
            </CardContent>
        </Card>
    );
}
