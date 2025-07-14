import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

export default function CompanyCard({ company }) {
    return (
        <Card sx={{ maxWidth: 350}}>
            <CardMedia
                component="img"

                image={`http://localhost:8080/company/${company.id}/getCover`}
                alt={`${company.companyName} cover`}
                sx={{
                    maxHeight: 150,
                    objectFit: 'cover',
                }}
            />

            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CardMedia
                        component="img"
                        image={`http://localhost:8080/company/${company.id}/getLogo`}
                        alt={`${company.companyName} Logo`}
                        sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                        }}
                    />
                    <Link to={`/company/${company.id}`}>
                        <Typography variant="h5" component="div" noWrap sx={{fontFamily: "'Barlow', sans-serif", fontWeight: 500}}>
                            {company.companyName}
                        </Typography>
                    </Link>
                </Box>


                <Typography
                    variant="body"
                    color="text.secondary"
                    sx={{
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontFamily: "'Barlow', sans-serif",
                        fontWeight: 500,
                    }}
                >
                    {company.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ color: 'gold' }} />
                        <Typography variant="body" color="text.primary" sx={{ ml: 0.5, fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
                            {company.rating}
                        </Typography>
                    </Box>
                    <Typography variant="body" color="text.secondary" sx={{fontFamily: "'Barlow', sans-serif", fontWeight: 500}}>
                        {company.location}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
