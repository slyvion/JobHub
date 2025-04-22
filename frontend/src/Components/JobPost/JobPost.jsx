import { Card, CardMedia, Typography, Box, Divider, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import React from "react";

export default function JobPost({ job }) {
    return (
        <Card sx={{
            display: 'flex',
            p: 3,
            border: '1px solid #ddd',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            width: 700,
            height: "180px",
            mb: 2,
            mt: 2,
            mr: 1,
            '&:hover': {
                outline: '2px solid rgba(51, 153, 255, 0.6)',
            }
        }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 4, ml: 1 }}>

            <Link to={`/jobposts/${job.id}`} style={{ textDecoration: 'none' }}>
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

                <Link to={`/jobposts/${job.id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" noWrap sx={{ mb: 1 }}>
                        {job.title}
                    </Typography>
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Link to={`/company/${job.company.id}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ color: '#6495ED', fontWeight: 500, mr: 1 }}>
                            {job.company.companyName}
                        </Typography>
                    </Link>
                    <StarIcon sx={{ color: 'gold', fontSize: 18, mr: 0.5 }} />
                    <Typography variant="body2" color="text.primary">
                        {job.company.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: '10px'}}>
                        {job.location}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {job.seniority && (
                        <>
                            {job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1).toLowerCase()}
                            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '1.2em' }} />
                        </>
                    )}
                    {job.jobType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '1.2em' }} />
                    {job.employmentType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </Typography>
                <Divider variant="left" sx={{mt: 1, width: "10%"}}/>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                    {job.tags && job.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" sx={{ margin: 0.5, borderRadius: 2 }} />
                    ))}
                </Box>

            </Box>
        </Card>
    );
}
