import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <Container>
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h1" component="div" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="div" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" gutterBottom>
            The page you are looking for does not exist. It might have been
            moved or deleted.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default NotFoundPage;
