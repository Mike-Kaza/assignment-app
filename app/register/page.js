'use client'

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const accType = 'customer'; // Hardcoded as customer

    try {
      const res = await fetch('/api/register', {  // Correct API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, acc_type: accType }),  // Send email, password, and accType
      });

      const data = await res.json(); // Parse the response body

      if (res.ok) {
        // Redirect to login page after successful registration
        window.location.href = '/login';  // Simple redirect to login page
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>

        {error && <Typography color="error">{error}</Typography>}

        <TextField
          label="Email" // Changed from Username to Email
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Set email value
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Set password value
          sx={{ mb: 2 }}
        />

        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Container>
  );
}
