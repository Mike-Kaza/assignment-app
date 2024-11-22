'use client'

import * as React from 'react';
import { useState } from 'react';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function MyApp() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);

  function runShowLogin() {
    setShowFirstPage(false);
    setShowLogin(true);
    setShowDash(false);
  }

  function runShowDash() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
  }

  function runShowFirst() {
    setShowFirstPage(true);
    setShowLogin(false);
    setShowDash(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy Kreme App
          </Typography>

          {/* Link to Dashboard */}
          <Link href="/dashboard" passHref>
            <Button color="inherit">Dashboard</Button>
          </Link>

          {/* Link to First Page */}
          <Button color="inherit" onClick={runShowFirst}>First</Button>

          {/* Link to Login Page */}
          <Link href="/login" passHref>
            <Button color="inherit">Login</Button>
          </Link>

          {/* Link to Register Page */}
          <Link href="/register" passHref>
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {showFirstPage && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          This is a very basic application. This has a bar across the top and this box! How this app works is by creating two boxes. They are hidden in the background of the page. It is only when a user clicks one of the buttons, we change the "state" from hidden (false) to show (true)
        </Box>
      )}

      {showLogin && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          This box is hidden until you click the button! Imagine this is one page in your app!
        </Box>
      )}

      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          Let's pretend this is the dashboard!
        </Box>
      )}
    </Box>
  );
}
