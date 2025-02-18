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
        <Box sx={{ width: '100%', backgroundColor: '#fff', padding: '16px', display: 'flex', gap: 1, justifyContent: 'center'}}>

                    <TextField
                        label="Company Name"
                        variant="outlined"
                        sx={{width: '350px'}}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <CountrySelect value={country} onChange={setCountry} />
                    <FormControl variant="outlined" >
                        <InputLabel>Rating</InputLabel>
                        <Select
                            label="Rating"
                            value={rating}
                            sx={{width: '100px'}}
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
                    <Button variant="contained" color="primary" fullWidth onClick={handleFilter} sx={{width: '90px'}}>
                        Filter
                    </Button>

        </Box>
    );
}
