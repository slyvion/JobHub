import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function CvUpload({ onFileChange }) {
    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "application/pdf": [".pdf"],
            "application/msword": [".doc", ".docx"],
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length) {
                setFile(acceptedFiles[0]);
            }
        },
    });

    useEffect(() => {
        if (onFileChange) {
            onFileChange(file);
        }
    }, [file, onFileChange]);

    const clearFile = () => {
        setFile(null);
    };

    return (
        <Box>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", marginBottom: 1, color: "black", opacity: 0.7 }}
            >
                or
            </Typography>

            <Box
                {...getRootProps()}
                sx={{
                    border: "2px dashed #d1d1d1",
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    color: "#757575",
                    position: "relative",
                }}
            >
                <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" sx={{ color: "#bdbdbd" }} />
                {file ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography sx={{ color: "#333", fontWeight: "bold" }}>{file.name}</Typography>
                        <IconButton
                            size="small"
                            aria-label="clear file"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearFile();
                            }}
                            sx={{ color: "#999" }}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ) : (
                    <Box>
                        <Typography color="primary" sx={{ fontWeight: "bold" }}>
                            Add CV
                        </Typography>
                        <Typography>or drag and drop</Typography>
                    </Box>
                )}

                <Typography variant="caption" sx={{ marginTop: 1, color: "#757575" }}>
                    JPG, PDF, DOC up to 10MB
                </Typography>
            </Box>
        </Box>
    );
}
