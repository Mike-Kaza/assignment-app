'use client';

import { useEffect, useState } from 'react';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  const [role, setRole] = useState(null); //store the user's role

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/check-session'); //call the session check API
        const data = await res.json();

        if (res.ok && data.role) {
          setRole(data.role); //set the user's role (manager or customer)
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Krispy Kreme App
          </Typography>
          {role && (
            <Button
              component={Link}
              href={role === 'manager' ? '/manager-dashboard' : '/dashboard'} //dynamic link based on role
              color="inherit"
            >
              DASHBOARD
            </Button>
          )}
          <Button component={Link} href="/view_cart" color="inherit">
            VIEW CART
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


