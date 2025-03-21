import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Box } from '@mui/material';
import {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

export default function JobPostFilter({ onFilter }) {
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [seniority, setSeniority] = useState('');
    const [jobType, setJobType] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = () => {
        const filterParams = {
            companyName: companyName || undefined,
            title: title || undefined,
            jobType: jobType || undefined,
            employmentType: employmentType || undefined,
            seniority: seniority || undefined,
        };

        const params = {};
        if (companyName) params.companyName = companyName;
        if (title) params.title = title;
        if (jobType) params.jobType = jobType;
        if (employmentType) params.employmentType = employmentType;
        if (seniority) params.seniority = seniority;

        setSearchParams(params);
        onFilter(filterParams);
    };
    useEffect(() => {
        const companyNameParam = searchParams.get('companyName') || '';
        const titleParam = searchParams.get('title') || '';
        const jobTypeParam = searchParams.get('jobType') || '';
        const employmentTypeParam = searchParams.get('employmentType') || '';
        const seniorityParam = searchParams.get('seniority') || '';

        setCompanyName(companyNameParam);
        setTitle(titleParam);
        setJobType(jobTypeParam);
        setEmploymentType(employmentTypeParam);
        setSeniority(seniorityParam);

        onFilter({
            companyName: companyNameParam || undefined,
            title: titleParam || undefined,
            jobType: jobTypeParam || undefined,
            employmentType: employmentTypeParam || undefined,
            seniority: seniorityParam || undefined
        });
    }, []);

    return (
        <Box sx={{ width: '100%', backgroundColor: '#fff', padding: '16px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={1.5}>
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={1.5}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Job Type</InputLabel>
                        <Select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            label="Job Type"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="ON_SITE">On Site</MenuItem>
                            <MenuItem value="HYBRID">Hybrid</MenuItem>
                            <MenuItem value="REMOTE">Remote</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={1.5}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Employment Type</InputLabel>
                        <Select
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            label="Employment Type"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="FULL_TIME">Full Time</MenuItem>
                            <MenuItem value="PART_TIME">Part Time</MenuItem>
                            <MenuItem value="CONTRACT">Contract</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Seniority</InputLabel>
                        <Select
                            value={seniority}
                            onChange={(e) => setSeniority(e.target.value)}
                            label="Seniority"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="INTERN">Intern</MenuItem>
                            <MenuItem value="JUNIOR">Junior</MenuItem>
                            <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                            <MenuItem value="SENIOR">Senior</MenuItem>

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
