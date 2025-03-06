import { Card, CardMedia, Typography, Box, Divider, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

export default function JobPost({ job }) {
    return (
        <Card sx={{
            display: 'flex',
            p: 3,
            border: '1px solid #ddd',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            maxWidth: 700,
            mb: 2,
            mt: 2,
            '&:hover': {
                outline: '2px solid rgba(51, 153, 255, 0.6)',
            }
        }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                <Link to={`/jobposts/${job.id}`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'contain',
                            boxShadow: '0px 0px 5px 2px rgba(169, 169, 169, 0.6)',
                        }}
                        image="/companyLogo.jpg"
                        alt={job.company.companyName}
                    />
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <StarIcon sx={{ color: 'gold', fontSize: 18, mr: 0.5 }} />
                    <Typography variant="body2" color="text.primary" sx={{ mr: 1 }}>
                        {job.company.rating}
                    </Typography>
                    <Link to={`/company/${job.company.id}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ color: '#6495ED' }}>
                            {job.company.companyName}
                        </Typography>
                    </Link>
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {job.location}
                </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Link to={`/jobposts/${job.id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" noWrap sx={{ mb: 1 }}>
                        {job.title}
                    </Typography>
                </Link>

                <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    {job.jobType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    <Box sx={{ mx: 1, height: '1.2em' }}>
                        <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
                    </Box>
                    {job.employmentType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {job.seniority ? job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1).toLowerCase() : 'Seniority Not Found'}
                </Typography>


                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {job.description && job.description.slice(0, 100)}{job.description && job.description.length > 100 ? '...' : ''}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                    {job.tags && job.tags.map((tag, index) => (
                        <Chip key={index} label={tag}  size="small" sx={{ margin: 0.5, borderRadius: 0 }} />
                    ))}
                </Box>
            </Box>
        </Card>
    );
}
