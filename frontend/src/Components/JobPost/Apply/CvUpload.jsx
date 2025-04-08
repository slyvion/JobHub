import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function CvUpload() {
    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/jpeg": [".jpg"], "application/pdf": [".pdf"], "application/msword": [".doc"] },
        maxSize: 10 * 1024 * 1024, // 10MB
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length) {
                setFile(acceptedFiles[0]);
            }
        },
    });

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1 , color: "Black", opacity: "0.7"}}>or</Typography>
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
                }}
            >
                <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" sx={{ color: "#bdbdbd" }} />
                {file ? (
                    <Typography sx={{ color: "#333", fontWeight: "bold" }}>{file.name}</Typography>
                ) : (
                    <Box>
                    <Typography color="primary" sx={{fontWeight: "bold" }}>
                        Add CV
                    </Typography>
                        <Typography>
                            or drag and drop
                        </Typography>
                    </Box>

                )}
                <Typography variant="caption" sx={{ marginTop: 1, color: "#757575" }}>JPG, PDF, DOC up to 10MB</Typography>
            </Box>
        </Box>
    );
}