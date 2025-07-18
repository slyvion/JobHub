import { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Box } from '@mui/material';
import CountrySelect from './CountrySelect.jsx';
import { useSearchParams } from "react-router-dom";

export default function CompanyFilter({ onFilter }) {
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = () => {
        const filterParams = {
            companyName: companyName || undefined,
            location: country || undefined,
            rating: rating || undefined,
            employeeNumber: employeeNumber || undefined
        };

        const params = {};
        if (companyName) params.companyName = companyName;
        if (country) params.location = country;
        if (rating) params.rating = rating;
        if (employeeNumber) params.employeeNumber = employeeNumber;

        setSearchParams(params);
        onFilter(filterParams);
    };

    useEffect(() => {
        const companyNameParam = searchParams.get('companyName') || '';
        const countryParam = searchParams.get('location') || '';
        const ratingParam = searchParams.get('rating') || '';
        const employeeNumberParam = searchParams.get('employeeNumber') || '';

        setCompanyName(companyNameParam);
        setCountry(countryParam);
        setRating(ratingParam);
        setEmployeeNumber(employeeNumberParam);

        onFilter({
            companyName: companyNameParam || undefined,
            location: countryParam || undefined,
            rating: ratingParam || undefined,
            employeeNumber: employeeNumberParam || undefined
        });
    }, []);

    return (
        <Box sx={{ width: '100%', backgroundColor: '#fff', p: 2 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" wrap="wrap">
                <Grid item xs={12} sm="auto">
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        sx={{ minWidth: 220 }}
                    />
                </Grid>
                <Grid item xs={12} sm="auto">
                    <CountrySelect
                        value={country}
                        onChange={setCountry}
                        sx={{ minWidth: 220 }}
                    />
                </Grid>
                <Grid item xs={12} sm="auto">
                    <FormControl variant="outlined" sx={{ minWidth: 180 }}>
                        <InputLabel>Employee Number</InputLabel>
                        <Select
                            label="Employee Number"
                            value={employeeNumber}
                            onChange={(e) => setEmployeeNumber(e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="LESS_THAN_20">{"<20"}</MenuItem>
                            <MenuItem value="BETWEEN_21_AND_50">21-50</MenuItem>
                            <MenuItem value="BETWEEN_51_AND_100">51-100</MenuItem>
                            <MenuItem value="BETWEEN_101_AND_300">101-300</MenuItem>
                            <MenuItem value="BETWEEN_301_AND_500">301-500</MenuItem>
                            <MenuItem value="MORE_THAN_500">500+</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm="auto">
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            label="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={1}>{'>1'}</MenuItem>
                            <MenuItem value={2}>{'>2'}</MenuItem>
                            <MenuItem value={3}>{'>3'}</MenuItem>
                            <MenuItem value={4}>{'>4'}</MenuItem>
                            <MenuItem value={5}>{'5'}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm="auto">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFilter}
                        sx={{ minWidth: 100, height: '56px' }}
                    >
                        Filter
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
