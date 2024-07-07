import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    axios.post('http://localhost:3000/admin/login', { username, password })
      .then(response => {
        // Save the user session information
        localStorage.setItem('user', JSON.stringify(response.data));
        history.push('/');
      })
      .catch(err => {
        setError('Login failed. Please check your credentials and try again.');
        console.log("Login failed. Please check your credentials and try again.", err.name, err.message);
      });
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <Typography variant="h5">Login</Typography>
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
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Paper>
  );
}

export default Login;