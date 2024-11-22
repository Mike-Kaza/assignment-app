// /app/dashboard/page.js
'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardActions } from '@mui/material';

export default function Dashboard() {
  const [data, setData] = useState(null);  // Store fetched products

  useEffect(() => {
    // Fetch product data from the API
    fetch('http://localhost:3000/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);  // Store products data in state
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  if (!data) return <Typography variant="h6" align="center">Loading products...</Typography>;  // Show loading message

  return (
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
  );
}
