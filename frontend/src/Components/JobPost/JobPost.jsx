import { Card, CardMedia, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

export default function JobPost({ job }) {
    return (
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
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
            <CardMedia
                component="img"
                sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                    boxShadow: '0px 0px 5px 2px rgba(169, 169, 169, 0.6)',
                }}
                image="/joblogo.jpg"
                alt={job.companyName}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, flex: 1 }}>
                <Typography variant="h6" noWrap sx={{ mb: 1 }}>
                    {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    {job.jobType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    <Box sx={{ mx: 1, height: '1.2em' }}>
                        <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
                    </Box>
                    {job.employmentType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {job.description && job.description.slice(0, 100)}{job.description && job.description.length > 100 ? '...' : ''}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Link to={`/company/${job.company.id}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ mr: 1, color: '#6495ED' }}>
                            {job.company.companyName}
                        </Typography>
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <StarIcon sx={{ color: 'gold', fontSize: 18 }} />
                        <Typography variant="body2" color="text.primary" sx={{ ml: 0.5 }}>
                            {job.company.rating}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {job.location}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}
