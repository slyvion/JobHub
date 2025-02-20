import {Box, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info.js";
import React from "react";

export default function NoCompFound(){
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#80bfff"
            p={2}
            borderRadius={2}
            width="20%"
            margin= 'auto'
            marginTop= '110px'
        >
            <InfoIcon />
            <Typography variant="body1" ml={1}>
                No Companies found with such criteria
            </Typography>
        </Box>
    );

}