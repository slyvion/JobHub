import { Card, CardMedia, Typography, Box, Divider, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import React from "react";

export default function JobPostHeader({ job }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                p: 3,
                border: '1px solid #ddd',
                boxShadow: 'none',
                width: '100%',
                maxWidth: '1200px',
                mb: 2,
                mt: 2,
                mx: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: { xs: 2, md: 0 },
                    mr: { md: 4 },
                }}
            >
                <Link to={`/company/${job.company.id}`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'contain',
                            boxShadow: '0px 0px 5px 2px rgba(169, 169, 169, 0.6)',
                        }}
                        image={`http://localhost:8080/company/${job.company.id}/getLogo`}
                        alt={job.company.companyName}
                    />
                </Link>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    {job.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
                    <Link to={`/company/${job.company.id}`} style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            sx={{ color: '#6495ED', fontWeight: 500, mr: 1 }}
                        >
                            {job.company.companyName}
                        </Typography>
                    </Link>
                    <StarIcon sx={{ color: 'gold', fontSize: 18, mr: 0.5 }} />
                    <Typography variant="h6" color="text.primary">
                        {job.company.rating}
                    </Typography>
                </Box>

                <Typography variant="body1">
                    <strong>Location:</strong> {job.location}
                </Typography>
                <Typography variant="body1">
                    <strong>Seniority:</strong> {job.seniority
                    ? job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1).toLowerCase()
                    : 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Job Type:</strong> {job.jobType
                    ? job.jobType.split('_').map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                    : 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Employment:</strong> {job.employmentType
                    ? job.employmentType.split('_').map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                    : 'N/A'}
                </Typography>

                <Divider sx={{ mt: 2, mb: 1, width: '100%' }} />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                    {job.tags && job.tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{ margin: 0.5, borderRadius: 2 }}
                        />
                    ))}
                </Box>
            </Box>
        </Card>
    );
}
