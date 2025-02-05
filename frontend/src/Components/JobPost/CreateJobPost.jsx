import { useState } from "react";
import { TextField, Button, MenuItem, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing(5),
}));

export default function CreateJobPost() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        jobType: "",
        employmentType: "",
        location: "",
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
        <FormContainer>
            <Typography variant="h5" align="center" gutterBottom>
                Create Job Post
            </Typography>
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
                            label="Description"
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
                            label="Company"
                            name="company"
                            fullWidth
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
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
                            <MenuItem value="Full-time">Full-time</MenuItem>
                            <MenuItem value="Part-time">Part-time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
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
                            <MenuItem value="Permanent">Permanent</MenuItem>
                            <MenuItem value="Temporary">Temporary</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Location"
                            name="location"
                            fullWidth
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormContainer>
    );
};
