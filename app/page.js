'use client'

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../src/components/Header'; // Import the Header component

export default function HomePage() {
  return (
    <Box>
      <Header /> {/* Use the Header component */}
      <Box sx={{ marginTop: '80px', padding: '20px' }}>
        {/* Your page content goes here */}
        <Typography variant="h4" gutterBottom>
          Welcome to the Krispy Kreme App
        </Typography>
        <Typography variant="body1">
          Enjoy browsing our products and placing orders.
        </Typography>
      </Box>
    </Box>
  );
}

