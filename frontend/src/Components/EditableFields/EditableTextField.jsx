import React from "react";
import { TextField, Button, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

export default function EditableTextField({ label, value, onChange, isEditable, onEdit, onSave ,  multiline = false}) {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <TextField
                label={label}
                fullWidth
                value={value}
                onChange={onChange}
                variant="outlined"
                disabled={!isEditable}
                multiline={multiline}

            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => (isEditable ? onSave() : onEdit())}
                size="small"
            >
                {isEditable ? <SaveIcon /> : <EditIcon />}
            </Button>
        </Box>
    );
}
