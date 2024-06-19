import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: "background.paper", py: 3 }} component="footer">
      <Container>
        {/* <Typography variant="body1">Contact Information</Typography> */}

        <Typography variant="body2" component="span" gutterBottom>
          <Link
            href="https://github.com/eiramada"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black" }}
          >
            <GitHubIcon sx={{ ml: 1 }} />
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          &copy; {currentYear} Recipe Vault. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
