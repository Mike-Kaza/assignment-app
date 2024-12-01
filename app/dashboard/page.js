'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import Header from '../../src/components/Header'; 

export default function Dashboard() {
  const [data, setData] = useState(null); //Store fetched products
  const [weather, setWeather] = useState(null); //Store weather data

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/getWeather'); //Fetch weather data from API
        const weatherData = await res.json();

        if (res.ok) {
          setWeather(weatherData); //store weather data
        } else {
          console.error(weatherData.error || 'Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather(); //fetch weather data when the page loads
  }, []);

  useEffect(() => {
    //fetch product data from the API
    fetch('/api/getProducts')
      .then((res) => res.json())
      .then((res) => {
        setData(res); //store products in state
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const putInCart = (pname) => {
    console.log('Putting in cart: ' + pname);

    fetch(`/api/putInCart?pname=${pname}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); //response from the API
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };

  if (!data) return <Typography variant="h6" align="center">Loading products...</Typography>;

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Header /> {}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Customer Dashboard
        </Typography>

        {}
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Today's temperature: {weather ? `${weather.temp}°C` : 'Loading weather...'}
        </Typography>

        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.pname}</Typography>
                  <Typography variant="body2" color="textSecondary">Price: ${item.price}</Typography>
                  <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => putInCart(item.pname)}
                    variant="outlined"
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}








