import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard.jsx";
import CompanyFilter from "./CompanyFilter.jsx";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";

export default function CompaniesPage() {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompanies = async (filterParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const validParams = Object.entries(filterParams)
                .filter(([key, value]) => value !== undefined && value !== '')
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

            const queryString = new URLSearchParams(validParams).toString();
            const url = `http://localhost:8080/companies${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCompanyData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <AppAppBar />
            <div
                style={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    paddingTop: 100,
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <CompanyFilter onFilter={fetchCompanies} />
            </div>

            <div style={{ flex: 1 }}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : companyData.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: 20 }}>No companies found.</p>
                ) : (
                    <Box mt={4} ml={6}>
                        <Grid container spacing={3}>
                            {companyData.map((company, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <CompanyCard company={company} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </div>

            <Footer />
        </div>
    );
}
