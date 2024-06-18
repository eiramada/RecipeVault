import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Recipe Vault
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/recipes">
            Recipes
          </Button>
          <Button color="inherit" component={Link} to="/menu-plan">
            Menu Plan
          </Button>
          <Button color="inherit" component={Link} to="/shopping-list">
            Shopping List
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
