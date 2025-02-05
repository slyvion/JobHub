import { Card, CardMedia, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

export default function JobPost({ job }) {
    return (
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: 600,
            mb: 2,
            mt: 2
        }}>
            <CardMedia
                component="img"
                sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'contain'
                }}
                image="/joblogo.jpg"
                alt={job.companyName}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, flex: 1 }}>
                <Typography variant="h6" noWrap sx={{ mb: 1 }}>
                    {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    {job.jobType}
                    <Box sx={{ mx: 1, height: '1.2em' }}>
                        <Divider orientation="vertical"  flexItem sx={{ height: '100%', borderColor: 'text.secondary' }} />
                    </Box>
                    {job.employmentType}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Link to={`/company/${job.company.id}`}>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mr: 1 }}>
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
