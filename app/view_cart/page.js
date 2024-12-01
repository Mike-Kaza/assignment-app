'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import Header from '../../src/components/Header';

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]); //store cart items
  const [totalPrice, setTotalPrice] = useState(0); //store total price

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch('/api/getCartItems'); //call the API to get cart items
        const data = await res.json();
        if (res.ok) {
          setCartItems(data.items); //store cart items in state
          //calculate total price
          const total = data.items.reduce((sum, item) => sum + item.price, 0);
          setTotalPrice(total);
        } else {
          console.error(data.error || 'Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        alert('Order placed successfully! Check your email for confirmation.');
        setCartItems([]); //clear cart after checkout
        setTotalPrice(0); //reset total price
      } else {
        alert(data.error || 'Failed to place order.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Header /> {}
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">Your cart is empty</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.pname}</Typography>
                  <Typography variant="body2" color="textSecondary">Price: ${item.price}</Typography>
                  <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {cartItems.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Container>
  );
}
