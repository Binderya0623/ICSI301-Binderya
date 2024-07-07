import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material';

function PhotoUpload() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('description', description);

    axios.post('http://localhost:3000/photos/new', formData)
      .then(response => {
        setSuccess('Photo uploaded successfully!');
        setError('');
      })
      .catch(error => {
        setError('Failed to upload photo. Please try again.');
        setSuccess('');
      });
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <Typography variant="h5">Upload Photo</Typography>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      />
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <Button variant="contained" color="primary" onClick={handleUpload} fullWidth>
        Upload
      </Button>
    </Paper>
  );
}

export default PhotoUpload;