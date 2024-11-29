'use client';

import { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';  // For redirection
import Header from '../../src/components/Header';  // Import Header

export default function ManagerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch('/api/check-session');  // Call the session check API

      if (res.status === 401) {  // If user is not authenticated
        router.push('/login');  // Redirect to login page
      }
    };

    checkSession();  // Run session check when the page loads
  }, [router]);

  return (
    <Container>
      <Header /> {/* Include the Header */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Manager Dashboard</Typography>
        <Typography variant="body1">Welcome, manager! You can manage orders, users, etc.</Typography>
        {/* Add Manager-specific content here */}
      </Box>
    </Container>
  );
}

