'use client'

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accType, setAccType] = useState('customer');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Make a request to save the user data
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, acc_type: accType }),
    });

    const data = await res.json();

    if (res.ok) {
      // Redirect to login page after successful registration
      window.location.href = '/login';
    } else {
      setError(data.error || 'Registration failed');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        
        {error && <Typography color="error">{error}</Typography>}
        
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Account Type"
          select
          fullWidth
          value={accType}
          onChange={(e) => setAccType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <option value="customer">Customer</option>
          <option value="manager">Manager</option>
        </TextField>
        
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Container>
  );
}
