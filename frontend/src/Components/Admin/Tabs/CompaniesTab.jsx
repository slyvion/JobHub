import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from "@mui/material";
import CompanyAdminFilter from "../AdminFilters/CompanyAdminFilter.jsx"
import NoCompFound from "../../Company/NoCompFound.jsx";
import { fetchAdminCompanies } from "../../Services/companyServices.js";

export default function CompaniesTab() {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCompanies = async (filterParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchAdminCompanies(filterParams);
            setCompanyData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                height: '100%',
                overflow: 'auto',
                position: 'relative',
                boxSizing: 'border-box',
            }}
        >

            <CompanyAdminFilter onFilter={getCompanies} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">Error: {error}</Typography>
            ) : companyData.length === 0 ? (
                <NoCompFound />
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2, maxWidth: 1550, mx: 'auto' }}>

                <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Website</strong></TableCell>
                                <TableCell><strong>Location</strong></TableCell>
                                <TableCell><strong>Phone</strong></TableCell>
                                <TableCell><strong>Facebook</strong></TableCell>
                                <TableCell><strong>Instagram</strong></TableCell>
                                <TableCell><strong>LinkedIn</strong></TableCell>
                                <TableCell><strong>Founded</strong></TableCell>
                                <TableCell><strong>Cities</strong></TableCell>
                                <TableCell><strong>Employees</strong></TableCell>
                                <TableCell><strong>Rating</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companyData.map((company, index) => (
                                <TableRow key={index}>
                                    <TableCell>{company.companyName}</TableCell>
                                    <TableCell>{company.email}</TableCell>
                                    <TableCell>
                                        <a href={`https://${company.website}`} target="_blank" rel="noreferrer">
                                            {company.website}
                                        </a>
                                    </TableCell>
                                    <TableCell>{company.location}</TableCell>
                                    <TableCell>{company.phoneNumber || "N/A"}</TableCell>
                                    <TableCell>
                                        {company.facebookLink ? (
                                            <a href={company.facebookLink} target="_blank" rel="noreferrer">{company.facebookLink}</a>
                                        ) : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {company.instagramLink ? (
                                            <a href={company.instagramLink} target="_blank" rel="noreferrer">{company.instagramLink}</a>
                                        ) : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {company.linkedinLink ? (
                                            <a href={company.linkedinLink} target="_blank" rel="noreferrer">{company.linkedinLink}</a>
                                        ) : "N/A"}
                                    </TableCell>
                                    <TableCell>{company.founded || "N/A"}</TableCell>
                                    <TableCell>{company.cities?.join(", ") || "N/A"}</TableCell>
                                    <TableCell>{company.employeeNumber || "N/A"}</TableCell>
                                    <TableCell>{company.rating}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
