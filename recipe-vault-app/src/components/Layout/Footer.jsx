import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: "background.paper", py: 3 }} component="footer">
      <Container>
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
          &copy; {currentYear} {t("appTitle")}. {t("allRightsReserved")}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
