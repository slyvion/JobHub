import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    MenuItem,
    Grid,
    Paper,
    Box,
    Select,
    InputLabel,
    OutlinedInput,
    Chip,
    Typography, Switch
} from "@mui/material";
import { styled } from "@mui/system";
import { fetchJobPost, updateJobPost, Tags } from "../Services/jobPostServices";

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 500,
    margin: "auto",
    paddingTop: theme.spacing(1),
}));

export default function EditJobPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        jobType: "",
        employmentType: "",
        description: "",
        jobInfo: "",
        isLink: false,
        requirements: "",
        seniority: "",
        applicationLink: "",
        tags: [],

    });

    const [isLink, setIsLink] = useState(true); // true = Link, false = Form


    useEffect(() => {
        const loadJobPost = async () => {
            try {
                const jobPost = await fetchJobPost(id);
                setFormData(jobPost);
                setIsLink(jobPost.isLink);
            } catch (error) {
                console.error("Error loading job post:", error);
            }
        };

        loadJobPost();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSwitchChange = (event) => {
        const newValue = event.target.checked;
        setIsLink(newValue);
        setFormData({
            ...formData,
            isLink: newValue,
            applicationLink: newValue ? formData.applicationLink : "",
        });
    };


    const handleTagChange = (event) => {
        setFormData({
            ...formData,
            tags: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateJobPost(id, formData);
            console.log("Job post updated successfully:", response);
            navigate("/jobposts");
        } catch (error) {
            console.error("Error updating job post:", error);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f0f0", paddingTop: "50px", paddingBottom: "50px" }}>
            <FormContainer>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <img src={"/Logo.png"} alt="Logo" style={{ width: "400px", height: "auto" }} />
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Title" name="title" fullWidth value={formData.title} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="About the role" name="description" fullWidth multiline rows={4} value={formData.description} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="What will you do" name="jobInfo" fullWidth multiline rows={4} value={formData.jobInfo} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Requirements" name="requirements" fullWidth multiline rows={4} value={formData.requirements} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sx={{ml: "150px"}}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="body1">Form</Typography>
                                <Switch
                                    checked={isLink}
                                    onChange={handleSwitchChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Typography variant="body1">Link</Typography>
                            </Box>
                        </Grid>

                        {isLink && (
                            <Grid item xs={12}>
                                <TextField label="Application Link" name="applicationLink" fullWidth value={formData.applicationLink} onChange={handleChange} required />
                            </Grid>
                        )}


                        <Grid item xs={12}>
                            <TextField select label="Seniority" name="seniority" fullWidth value={formData.seniority} onChange={handleChange} required>
                                <MenuItem value="INTERN">Internship</MenuItem>
                                <MenuItem value="JUNIOR">Junior</MenuItem>
                                <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                                <MenuItem value="SENIOR">Senior</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select label="Job Type" name="jobType" fullWidth value={formData.jobType} onChange={handleChange} required>
                                <MenuItem value="ON_SITE">On Site</MenuItem>
                                <MenuItem value="HYBRID">Hybrid</MenuItem>
                                <MenuItem value="REMOTE">Remote</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select label="Employment Type" name="employmentType" fullWidth value={formData.employmentType} onChange={handleChange} required>
                                <MenuItem value="FULL_TIME">Full Time</MenuItem>
                                <MenuItem value="PART_TIME">Part Time</MenuItem>
                                <MenuItem value="CONTRACT">Contract</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Technologies"
                                name="tags"
                                fullWidth
                                SelectProps={{
                                    multiple: true,
                                    value: formData.tags,
                                    onChange: handleTagChange,
                                    renderValue: (selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    ),
                                }}
                            >
                                {Tags.map((tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        {tag}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </FormContainer>
        </Box>
    );
}