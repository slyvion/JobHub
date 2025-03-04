import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

export default function CompanyCard({ company }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="200"
                image={company.companyImage || '/companyCover.jpg'}
                alt={`${company.companyName} cover`}
                sx={{
                    objectFit: 'cover',
                }}
            />

            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CardMedia
                        component="img"
                        image={company.companyLogo || '/companyLogo.jpg'}
                        alt="Company Logo"
                        sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                        }}
                    />
                    <Link to={`/company/${company.id}`}>
                        <Typography variant="h6" component="div" noWrap>
                            {company.companyName}
                        </Typography>
                    </Link>
                </Box>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {company.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ color: 'gold' }} />
                        <Typography variant="body2" color="text.primary" sx={{ ml: 0.5 }}>
                            {company.rating}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {company.location}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
