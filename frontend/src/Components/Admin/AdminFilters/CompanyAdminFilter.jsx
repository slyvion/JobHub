import {useEffect, useState} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import CountrySelect from '../../Company/CountrySelect.jsx';
import {useSearchParams} from "react-router-dom";

export default function CompanyFilter({ onFilter }) {
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [rating, setRating] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [founded, setFounded] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();


    const handleFilter = () => {
        const filterParams = {
            companyName: companyName || undefined,
            location: country || undefined,
            rating: rating || undefined,
            employeeNumber: employeeNumber || undefined,
            founded: founded || undefined,
            email: email || undefined,
            website: website || undefined
        };

        const params = {};
        if (companyName) params.companyName = companyName;
        if (country) params.location = country;
        if (rating) params.rating = rating;
        if (employeeNumber) params.employeeNumber = employeeNumber;
        if (founded) params.founded = founded;
        if (email) params.email = email;
        if (website) params.website = website;

        setSearchParams(params);
        onFilter(filterParams);
    };


    useEffect(() => {
        const companyNameParam = searchParams.get('companyName') || '';
        const countryParam = searchParams.get('location') || '';
        const ratingParam = searchParams.get('rating') || '';
        const employeeNumberParam = searchParams.get('employeeNumber') || '';
        const foundedParam = searchParams.get('founded') || '';
        const emailParam = searchParams.get('email') || '';
        const websiteParam = searchParams.get('website') || '';

        console.log(websiteParam);
        console.log(emailParam);

        setCompanyName(companyNameParam);
        setCountry(countryParam);
        setRating(ratingParam);
        setEmployeeNumber(employeeNumberParam);
        setFounded(foundedParam);
        setEmail(emailParam);
        setWebsite(websiteParam);


        onFilter({
            companyName: companyNameParam || undefined,
            location: countryParam || undefined,
            rating: ratingParam || undefined,
            employeeNumber: employeeNumberParam || undefined,
            founded: foundedParam || undefined,
            email: emailParam || undefined,
            website: websiteParam || undefined

        });
    }, []);

    return (
        <Box sx={{ width: '100%', backgroundColor: '#fff', padding: '16px', display: 'flex', gap: 1, justifyContent: 'center'}}>

            <TextField
                label="Company Name"
                variant="outlined"
                sx={{width: '300px'}}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <TextField
                label="Email"
                variant="outlined"
                sx={{width: '300px'}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label="Website"
                variant="outlined"
                sx={{width: '300px'}}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
            />

            <CountrySelect value={country} onChange={setCountry} />

            <FormControl variant="outlined" >
                <InputLabel>Employee Number</InputLabel>
                <Select
                    label="Employee Number"
                    value={employeeNumber}
                    sx={{width: '200px'}}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="LESS_THAN_20">{"<20"}</MenuItem>
                    <MenuItem value="BETWEEN_21_AND_50"> 21-50 </MenuItem>
                    <MenuItem value="BETWEEN_51_AND_100"> 51-100 </MenuItem>
                    <MenuItem value="BETWEEN_101_AND_300"> 101-300 </MenuItem>
                    <MenuItem value="BETWEEN_301_AND_500"> 301-500 </MenuItem>
                    <MenuItem value="MORE_THAN_500"> 500+ </MenuItem>
                </Select>
            </FormControl>

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
                    <MenuItem value={1}> {'>1'} </MenuItem>
                    <MenuItem value={2}> {'>2'} </MenuItem>
                    <MenuItem value={3}> {'>3'} </MenuItem>
                    <MenuItem value={4}> {'>4'} </MenuItem>
                    <MenuItem value={5}> {' 5'} </MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" fullWidth onClick={handleFilter} sx={{width: '90px'}}>
                Filter
            </Button>

        </Box>
    );
}
