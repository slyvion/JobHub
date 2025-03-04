import React from "react";
import { Select, MenuItem, FormControl, InputLabel, Button, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

export default function EditableSelectField({ label, value, onChange, options, isEditable, onEdit, onSave }) {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    label={label}
                    disabled={!isEditable}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={isEditable ? onSave : onEdit}
                size="small"
            >
                {isEditable ? <SaveIcon /> : <EditIcon />}
            </Button>
        </Box>
    );
}