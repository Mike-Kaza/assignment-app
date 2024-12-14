'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import Header from '../../src/components/Header';

export default function ManagerDashboard() {
  const [orders, setOrders] = useState([]); //state to store orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/getOrders'); //fetch orders from the API
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders); //store orders in state
        } else {
          console.error(data.error || 'Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); //fetch orders
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Header /> {}
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Manager Dashboard
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="h6" align="center">No orders found</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order, index) => (
            <Grid item key={index} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Order #{order._id}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Customer: {order.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {order.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total: ${order.total.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Products:
                  </Typography>
                  <ul>
                    {(order.products || []).map((product, idx) => (
                      <li key={idx}>{product}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

