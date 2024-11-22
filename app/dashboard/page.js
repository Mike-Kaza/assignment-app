// /app/dashboard/page.js
'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardActions } from '@mui/material';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState(null);  // Store fetched products

  useEffect(() => {
    // Fetch product data from the API
    fetch('http://localhost:3000/api/getProducts')
      .then((res) => res.json())  // Parse the response to JSON
      .then((data) => {
        setData(data);  // Set products to state
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  if (!data) return <Typography variant="h6" align="center">Loading products...</Typography>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy Kreme App
          </Typography>

          {/* Links to different pages */}
          <Link href="/dashboard" passHref>
            <Button color="inherit">Dashboard</Button>
          </Link>
          <Link href="/first" passHref>
            <Button color="inherit">First</Button>
          </Link>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Dashboard - Product List
        </Typography>
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.pname}</Typography>
                  <Typography variant="body2" color="textSecondary">Price: {item.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined">Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
