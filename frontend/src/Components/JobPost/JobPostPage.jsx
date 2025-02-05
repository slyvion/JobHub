import { useEffect, useState } from "react";
import { Box } from "@mui/material"; // Import Box component
import JobPostFilter from "./JobPostFilter.jsx";
import JobPost from "./JobPost.jsx";
import AppAppBar from "../AppAppBar.jsx";

export default function JobPostPage() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobPosts = async (filterParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const validParams = Object.entries(filterParams)
                .filter(([key, value]) => value !== undefined && value !== '')
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

            const queryString = new URLSearchParams(validParams).toString();
            const url = `http://localhost:8080/jobposts${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setJobPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobPosts();
    }, []);

    return (
        <div style={{ background: 'white', paddingTop: '100px', minHeight: '100vh' }}>
            <AppAppBar />
            <JobPostFilter onFilter={fetchJobPosts} />

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Box sx={{ paddingLeft: '600px' }}>
                    {jobPosts.map((job) => (
                        <JobPost key={job.id} job={job} />
                    ))}
                </Box>
            )}
        </div>
    );
}
