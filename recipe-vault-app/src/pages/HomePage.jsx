import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Featured Recipes
        </Typography>
        <Paper
          sx={{
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Replace with a carousel component */}
          <Typography variant="h6">Carousel Placeholder</Typography>
        </Paper>
      </Box>
      <Box sx={{ my: 4 }}>
        <TextField fullWidth label="Search Recipes" variant="outlined" />
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Popular Categories
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>Breakfast</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>Lunch</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>Dinner</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>Desserts</Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
