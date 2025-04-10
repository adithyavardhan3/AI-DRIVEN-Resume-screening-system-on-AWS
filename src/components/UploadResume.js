import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [score, setScore] = useState(null);

  const S3_BUCKET = "resume-screening-uploads1 ";
  const REGION = "us-east-1";
  const API_ENDPOINT = "https://vet9qyj0jk.execute-api.us-east-1.amazonaws.com/pord";

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setUploading(true);

    const fileName = `${Date.now()}_${file.name}`;

    try {
      // Step 1: Upload to S3 via pre-signed URL (or your upload endpoint)
      const uploadUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      alert("Upload successful!");

      // Step 2: Call the scoring API
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bucket: S3_BUCKET,
          key: fileName,
        }),
      });

      const data = await response.json();
      setScore(data.score || "No score returned");
    } catch (error) {
      console.error("Upload or scoring failed", error);
      alert("Upload or scoring failed!");
    }

    setUploading(false);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "text/plain": [".txt"],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #6a11cb",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        background: "#f5f5f5",
        margin: "20px auto",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6">Drag & Drop your resume here (.txt)</Typography>

      {file ? (
        <Typography variant="body2" sx={{ marginTop: "10px", fontWeight: "bold", color: "#333" }}>
          {file.name}
        </Typography>
      ) : (
        <Button
          onClick={open}
          sx={{
            marginTop: "10px",
            background: "#6a11cb",
            color: "white",
            "&:hover": { background: "#2575fc" },
          }}
        >
          Select File
        </Button>
      )}

      {file && (
        <Button
          onClick={handleUpload}
          sx={{
            marginTop: "15px",
            background: "#ff9800",
            color: "white",
            "&:hover": { background: "#e65100" },
          }}
          disabled={uploading}
        >
          {uploading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Upload & Score"}
        </Button>
      )}

      {score && (
        <Typography variant="h6" sx={{ marginTop: "20px", color: "#2e7d32" }}>
          Resume Score: {score}
        </Typography>
      )}
    </Box>
  );
};

export default UploadResume;
