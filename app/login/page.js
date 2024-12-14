'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import validator from 'email-validator';
import escapeHtml from 'escape-html';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  //function handle login process
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password cannot be blank');
      return;
    }

    if (!validator.validate(email)) {
      setError('Invalid email format');
      return;
    }

    
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPassword = escapeHtml(password);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: sanitizedEmail, password: sanitizedPassword }),
    });

    if (res.ok) {
      const data = await res.json();

      //redirect based on user role
      if (data.role === 'manager') {
        window.location.href = '/manager-dashboard';
      } else if (data.role === 'customer') {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid role assigned. Please contact support.');
      }
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
          inputProps={{ maxLength: 30 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 50 }}
        />

        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}



