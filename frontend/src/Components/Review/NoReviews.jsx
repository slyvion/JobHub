import {Box, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info.js";
import React from "react";

export default function NoReviews(){
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#80bfff"
            p={2}
            borderRadius={2}
        >
            <InfoIcon />
            <Typography variant="body1" ml={1}>
                There are currently no reviews for this company.
            </Typography>
        </Box>
    );

}