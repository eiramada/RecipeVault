import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function NotFoundPage() {
  const { t } = useTranslation();
  useDocumentTitle("pageNotFound.title");

  return (
    <div>
      <Container>
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h1" component="div" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="div" gutterBottom>
            {t("pageNotFound.title")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t("pageNotFound.description")}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            {t("pageNotFound.goToHome")}
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default NotFoundPage;
