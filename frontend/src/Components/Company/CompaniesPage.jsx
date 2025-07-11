import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard.jsx";
import CompanyFilter from "./CompanyFilter.jsx";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppAppBar from "../AppAppBar.jsx";
import Footer from "../HomePage/Footer.jsx";
import { Typography, CircularProgress, Pagination } from "@mui/material";
import NoCompFound from "./NoCompFound.jsx";
import { fetchCompanies } from "../Services/companyServices.js";
import { useLocation } from "react-router-dom";

export default function CompaniesPage() {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [filterParams, setFilterParams] = useState({});

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryCompanyName = queryParams.get("companyName");

    const getCompanies = async (filters = filterParams, page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCompanies(filters, page);
            setCompanyData(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (queryCompanyName) {
            const initialFilters = { companyName: queryCompanyName };
            setFilterParams(initialFilters);
            getCompanies(initialFilters, 0);
        } else {
            getCompanies();
        }
    }, [queryCompanyName]);

    const handlePageChange = (event, value) => {
        getCompanies(filterParams, value - 1);
    };

    const handleFilter = (filters) => {
        setFilterParams(filters);
        getCompanies(filters, 0);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#f0f0f0",
                position: "relative",
            }}
        >
            <AppAppBar />

            <Box
                sx={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    px: { xs: 2, sm: 3, md: 6 },
                    py: { xs: 3, sm: 4 },
                    pt: { xs: "80px", sm: "90px", md: "100px" },
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <CompanyFilter onFilter={handleFilter} />
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                    px: { xs: 2, sm: 3, md: 6 },
                }}
            >
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography variant="body1" color="error">
                        Error: {error}
                    </Typography>
                ) : companyData.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                        <NoCompFound />
                    </Box>
                ) : (
                    <>
                        <Box mt={4} width="100%">
                            <Grid container spacing={3}>
                                {companyData.map((company, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <CompanyCard company={company} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Box display="flex" justifyContent="center" mt={4} mb={4}>
                            <Pagination
                                count={totalPages}
                                page={currentPage + 1}
                                shape="rounded"
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Box>

            <Footer />
        </Box>
    );
}
