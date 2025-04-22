import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard.jsx";
import CompanyFilter from "./CompanyFilter.jsx";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";
import { Typography } from "@mui/material";
import NoCompFound from './NoCompFound.jsx';
import CircularProgress from "@mui/material/CircularProgress";
import { fetchCompanies } from "../Services/companyServices.js";

export default function CompaniesPage() {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCompanies = async (filterParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchCompanies(filterParams);
            setCompanyData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#f0f0f0",
            position: "relative",
        }}>
            <AppAppBar />
            <Box
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    paddingTop: '100px',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <CompanyFilter onFilter={getCompanies} />
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 4 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography variant="body1" color="error">
                        Error: {error}
                    </Typography>
                ) : companyData.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        <NoCompFound />
                    </Typography>
                ) : (
                    <Box mt={4} ml={6} width="100%">
                        <Grid container spacing={3}>
                            {companyData.map((company, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <CompanyCard company={company} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>

            <Footer />
        </Box>
    );
}
