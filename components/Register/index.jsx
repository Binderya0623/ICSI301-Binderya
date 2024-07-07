import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = () => {
    axios.post('http://localhost:3000/admin/register', { username, password })
      .then(response => {
        // Save the user session information
        localStorage.setItem('user', JSON.stringify(response.data));
        history.push('/');
      })
      .catch(error => {
        setError('Registration failed. Please try again.');
      });
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <Typography variant="h5">Register</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
        Register
      </Button>
    </Paper>
  );
}

export default Register;