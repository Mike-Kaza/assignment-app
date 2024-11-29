'use client'

import * as React from 'react';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function MyApp() {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Krispy Kreme App
          </Typography>
          <Button component={Link} href="/dashboard" color="inherit">
            DASHBOARD
          </Button>
          <Button component={Link} href="/login" color="inherit">
            LOGIN
          </Button>
          <Button component={Link} href="/register" color="inherit">
            REGISTER
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

