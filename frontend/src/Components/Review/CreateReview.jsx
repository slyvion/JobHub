import React from 'react';
import { Grid, TextField, Rating, Button, FormControl, FormHelperText, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateReview() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            rating: null,
            comment: '',
        },
        mode: 'onSubmit',
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = (data) => {
        console.log(data);
        reset();
        navigate(`/company/${id}`);
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
                                        id="outlined-basic"
                                        label="Title"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.title}
                                        helperText={errors.title ? errors.title.message : ''}
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
                                                name="half-rating"
                                                defaultValue={null}
                                                precision={0.5}
                                                size="large"
                                                onChange={(_, value) => field.onChange(value)}
                                            />
                                            {errors.rating && <FormHelperText>{errors.rating.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="comment"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-multiline-static"
                                        label="Comment"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
}
