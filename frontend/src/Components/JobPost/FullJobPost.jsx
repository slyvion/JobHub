import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Paper, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField,
    Snackbar, Alert
} from '@mui/material';
import JobPostHeader from './JobPostHeader';
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";
import { fetchJobPost, deleteJobPost } from '../Services/jobPostServices';
import { saveJobPost } from '../Services/userServices.js';

export default function FullJobPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [confirmText, setConfirmText] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error' | 'info' | 'warning'

    useEffect(() => {
        const getJob = async () => {
            try {
                const data = await fetchJobPost(id);
                setJob(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
                showSnackbar("Failed to load job details.", "error");
            }
        };
        getJob();
    }, [id]);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteJobPost(job.id);
            navigate('/jobposts');
            showSnackbar("Job post deleted successfully.", "success");
        } catch (err) {
            console.error('Error deleting job post:', err);
            showSnackbar("Failed to delete job post.", "error");
        }
    };

    const handleSaveJob = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                showSnackbar('You must be logged in to save jobs.', 'warning');
                return;
            }

            const res = await fetch('http://localhost:8080/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error('Unauthorized');
            const { type, data } = await res.json();

            if (type !== 'user') {
                showSnackbar('Unexpected user type.', 'error');
                return;
            }

            const userId = data.id;

            const message = await saveJobPost(userId, id);
            showSnackbar(message, 'success');
        } catch (error) {
            console.error('Error saving job:', error);
            showSnackbar('Failed to save job post.', 'error');
        }
    };


    if (!job) {
        return <Typography variant="h6" color="text.secondary">Loading job details...</Typography>;
    }

    return (
        <Box sx={{
            backgroundColor: "#f0f0f0",
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                paddingTop: "100px",
                position: "relative",
            }}>
                <AppAppBar />
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                padding: 3,
            }}>
                <Box sx={{ maxWidth: '1200px', width: '100%' }}>
                    <JobPostHeader job={job} sx={{ width: '100%' }} />

                    <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                            <Typography variant="h4" sx={{ paddingBottom: '10px' }}>About the Role</Typography>
                            <Typography variant="body1" color="text.secondary">{job.description}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" sx={{ paddingBottom: '10px' }}>What You’ll Do</Typography>
                            <Typography variant="body1" color="text.secondary">{job.jobInfo}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" sx={{ paddingBottom: '10px' }}>Requirements</Typography>
                            <Typography variant="body1" color="text.secondary">{job.requirements}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
                            <Button
                                variant="contained"
                                onClick={handleSaveJob}
                                sx={{
                                    width: '60px',
                                    height: '40px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    border: '1px solid #ccc',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                    }
                                }}
                            >
                                Save
                            </Button>

                            {job.isLink ? (
                                <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: '60px',
                                            height: '40px',
                                            backgroundColor: '#1976d2',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1565c0',
                                            },
                                            marginLeft: 1
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </a>
                            ) : (
                                <Link to={`/jobposts/${id}/apply`}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: '60px',
                                            height: '40px',
                                            backgroundColor: '#1976d2',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1565c0',
                                            },
                                            marginLeft: 1
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </Link>
                            )}

                            <Link to={`/jobposts/${id}/edit`}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: '60px',
                                        height: '40px',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        border: '1px solid #ccc',
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                        marginLeft: 1
                                    }}
                                >
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    width: '70px',
                                    height: '40px',
                                    marginLeft: 1,
                                }}
                                onClick={() => setOpenDeleteModal(true)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            <Footer />

            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 2 }}>
                        Are you sure you want to delete this jobpost? If you are, please write <strong>"Delete"</strong> in the field below.
                    </Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        variant="outlined"
                        placeholder="Delete"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        disabled={confirmText !== "Delete"}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
