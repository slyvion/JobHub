import {useEffect, useState} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Box } from '@mui/material';
import CountrySelect from './CountrySelect.jsx';
import {useSearchParams} from "react-router-dom";

export default function CompanyFilter({ onFilter }) {
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();


    const handleFilter = () => {
        const filterParams = {
            companyName: companyName || undefined,
            location: country || undefined,
            rating: rating || undefined
        };


        const params = {};
        if (companyName) params.companyName = companyName;
        if (country) params.location = country;
        if (rating) params.rating = rating;

        setSearchParams(params);
        onFilter(filterParams);
    };


    useEffect(() => {
        const companyNameParam = searchParams.get('companyName') || '';
        const countryParam = searchParams.get('location') || '';
        const ratingParam = searchParams.get('rating') || '';

        setCompanyName(companyNameParam);
        setCountry(countryParam);
        setRating(ratingParam);


        onFilter({
            companyName: companyNameParam || undefined,
            location: countryParam || undefined,
            rating: ratingParam || undefined
        });
    }, []);

    return (
        <Box sx={{ width: '100%', backgroundColor: '#fff', padding: '16px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <CountrySelect value={country} onChange={setCountry} />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            label="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleFilter}>
                        Filter
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
