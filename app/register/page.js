'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import validator from 'email-validator';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Please fill in all fields'); //ensure all fields are filled
      return;
    }

    if (!validator.validate(email)) {
      setError('Invalid email format'); //ensure email format is valid
      return;
    }

    const accType = 'customer'; //hardcoded as customer

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, acc_type: accType }), //send email, password, and accType
      });

      const data = await res.json();

      if (res.ok) {
        //redirect to login page after successful registration
        window.location.href = '/login';
      } else {
        setError(data.error || 'Registration failed'); //display server side error or generic message
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Registration failed. Please try again later.'); //handle unexpected errors
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>

        {error && <Typography color="error">{error}</Typography>} {}

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)} //update email state on input change
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 254 }}
        />
        <TextField
          label="Password"
          type="password" //password input for secure text entry
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)} //update password state on input change
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 128 }}
        />

        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Container>
  );
}


