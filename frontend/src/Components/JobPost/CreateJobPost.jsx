import React, { useState } from "react";
import { TextField, Button, MenuItem, Grid, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 500,
    margin: "auto",
    paddingTop: theme.spacing(1),
}));

export default function CreateJobPost() {
    const [formData, setFormData] = useState({
        title: "",
        jobType: "",
        employmentType: "",
        description: "",
        jobInfo: "",
        requirements: "",
        seniority: "",
        applicationLink: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted", formData);
    };

    return (
        <Box sx={{minHeight: "100vh", backgroundColor: "#f0f0f0", paddingTop: '50px', paddingBottom: '50px'}}>
        <FormContainer>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <img src={'src/Logo.png'} alt="Logo" style={{ width: '400px', height: 'auto'}} />
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            name="title"
                            fullWidth
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="About the role"
                            name="description"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="What will you do"
                            name="jobInfo"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.jobInfo}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Requirements"
                            name="requirements"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.requirements}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Application Link"
                            name="applicationLink"
                            fullWidth
                            rows={4}
                            value={formData.applicationLink}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Seniority"
                            name="seniority"
                            fullWidth
                            value={formData.seniority}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="INTERN">Internship</MenuItem>
                            <MenuItem value="JUNIOR">Junior</MenuItem>
                            <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                            <MenuItem value="SENIOR">Senior</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Job Type"
                            name="jobType"
                            fullWidth
                            value={formData.jobType}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="ON_SITE">On Site< /MenuItem>
                            <MenuItem value="HYBRID">Hybrid< /MenuItem>
                            <MenuItem value="REMOTE">Remote</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Employment Type"
                            name="employmentType"
                            fullWidth
                            value={formData.employmentType}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="FULL_TIME"> Full Time </MenuItem>
                            <MenuItem value="PART_TIME"> Part Time </MenuItem>
                            <MenuItem value="CONTRACT" > Contract  </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormContainer>
        </Box>
    );
}
