import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("appTitle")}
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            {t("home")}
          </Button>
          <Button color="inherit" component={Link} to="/recipes" sx={{ mx: 1 }}>
            {t("recipes")}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/menu-plan"
            sx={{ mx: 1 }}
          >
            {t("menuPlanTitle")}
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/shopping-list"
            sx={{ mx: 1 }}
          >
            {t("shoppingList")}
          </Button>
          <Button color="inherit" component={Link} to="/profile" sx={{ mx: 1 }}>
            {t("profile")}
          </Button>
          <IconButton color="inherit" onClick={() => i18n.changeLanguage("ee")}>
            <img src="/ee_flag.ico" alt="EE Flag" style={{ width: 20 }} />
          </IconButton>
          <IconButton color="inherit" onClick={() => i18n.changeLanguage("en")}>
            <img src="/en_flag.ico" alt="UK Flag" style={{ width: 20 }} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
