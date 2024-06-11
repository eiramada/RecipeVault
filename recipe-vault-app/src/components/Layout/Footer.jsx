import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 3 }} component="footer">
      <Container>
        <Typography variant="body1">Contact Information</Typography>
        <Typography variant="body2" color="text.secondary">
          &copy; 2024 RecipeVault. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
