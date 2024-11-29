'use client'

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Store the role in localStorage
      localStorage.setItem('userRole', data.role);  // Store the role (manager or customer)
      window.location.href = '/dashboard';  // Redirect to dashboard
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>

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

        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}

