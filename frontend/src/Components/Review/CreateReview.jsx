import React, { useEffect, useState } from 'react';
import { Grid, TextField, Rating, Button, FormControl, FormHelperText, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { addReview } from '../Services/reviewServices.js';

export default function CreateReview({ onClose }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            rating: null,
            pros: '',
            cons: '',
        },
        mode: 'onSubmit',
    });

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const { id: companyId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:8080/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Unauthorized');
                const { type, data } = await res.json();

                if (type === 'user') {
                    setUserId(data.id);
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                navigate('/sign-in');
            }
        };

        fetchUser();
    }, [navigate]);

    const onSubmit = async (formData) => {
        if (!userId) return;

        const reviewData = {
            ...formData,
            userId,
            companyId,
        };

        try {
            await addReview(companyId, reviewData);
            reset();
            navigate(`/company/${companyId}`);
            onClose();
        } catch (err) {
            console.error('Failed to submit review:', err);
        }
    };

    return (
        <Box
            p={3}
            sx={{
                background: 'white',
                paddingTop: '100px',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '16px',
                    width: '100%',
                    maxWidth: '600px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Grid item sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <img src="/Logo.png" alt="Logo" style={{ width: '400px', height: 'auto' }} />
                </Grid>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="title"
                                control={control}
                                rules={{ required: 'Title is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Title"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.rating}>
                                <Controller
                                    name="rating"
                                    control={control}
                                    rules={{ required: 'Rating is required' }}
                                    render={({ field }) => (
                                        <>
                                            <Rating
                                                {...field}
                                                name="rating"
                                                precision={0.5}
                                                size="large"
                                                onChange={(_, value) => {
                                                    if (value && value >= 1) {
                                                        field.onChange(value);
                                                    }
                                                }}
                                            />
                                            <FormHelperText>{errors.rating?.message}</FormHelperText>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="pros"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Pros"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="cons"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Cons"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} textAlign="center">
                            <Button type="submit" variant="contained" color="primary" disabled={!userId}>
                                Submit Review
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
}
