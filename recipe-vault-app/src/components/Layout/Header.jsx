import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Recipe Vault
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
          <Button color="inherit" component={Link} to="/shopping-list">Shopping List</Button>
          <Button color="inherit" component={Link} to="/profile">Profile</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
