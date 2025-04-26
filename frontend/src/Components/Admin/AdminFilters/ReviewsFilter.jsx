import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function ReviewsFilter({ onFilter }) {
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const companyNameParam = searchParams.get('companyName') || '';
        const titleParam = searchParams.get('title') || '';
        const ratingParam = searchParams.get('rating') || '';

        setCompanyName(companyNameParam);
        setTitle(titleParam);
        setRating(ratingParam);

        onFilter({
            companyName: companyNameParam || undefined,
            title: titleParam || undefined,
            rating: ratingParam || undefined,
        });
    }, []);

    const handleFilter = () => {

        const filterParams = {
            companyName: companyName || undefined,
            title: title || undefined,
            rating: rating || undefined,
        };

        const params = {};
        if (companyName) params.companyName = companyName;
        if (title) params.title = title;
        if (rating) params.rating = rating;

        setSearchParams(params);
        onFilter(filterParams);
    };

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                padding: '16px',
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}
        >
            <TextField
                label="Company Name"
                variant="outlined"
                sx={{ width: '300px' }}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <TextField
                label="Title"
                variant="outlined"
                sx={{ width: '300px' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl variant="outlined" sx={{ width: '120px' }}>
                <InputLabel>Rating</InputLabel>
                <Select
                    label="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>0</MenuItem>
                    <MenuItem value={2}>{'>1-2'}</MenuItem>
                    <MenuItem value={3}>{'>2-3'}</MenuItem>
                    <MenuItem value={4}>{'>3-4'}</MenuItem>
                    <MenuItem value={5}>{'>4-5'}</MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleFilter}
                sx={{ width: '90px', height: '56px' }}
            >
                Filter
            </Button>
        </Box>
    );
}
