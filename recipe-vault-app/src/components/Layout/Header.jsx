import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  const menuItems = [
    { text: t("home"), path: "/" },
    { text: t("recipes"), path: "/recipes" },
    { text: t("menuPlanTitle"), path: "/menu-plan" },
    { text: t("shoppingList"), path: "/shopping-list" },
    { text: t("profile"), path: "/profile" },
  ];

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, whiteSpace: 'nowrap'}}>
            {t("appTitle")}
          </Typography>
          <Grid container justifyContent="flex-end" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item, index) => (
              <Button key={index} color="inherit" component={Link} to={item.path} sx={{ mx: 1 }}>
                {item.text}
              </Button>
            ))}
            <IconButton color="inherit" onClick={() => changeLanguage("ee")}>
              <img src="/ee_flag.ico" alt="EE Flag" style={{ width: 20 }} />
            </IconButton>
            <IconButton color="inherit" onClick={() => changeLanguage("en")}>
              <img src="/en_flag.ico" alt="UK Flag" style={{ width: 20 }} />
            </IconButton>
          </Grid>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <List>
              {menuItems.map((item, index) => (
                <ListItem button key={index} component={Link} to={item.path} onClick={handleDrawerClose}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <Divider />
              <ListItem button onClick={() => { changeLanguage("ee"); handleDrawerClose(); }}>
                <ListItemIcon>
                  <img src="/ee_flag.ico" alt="EE Flag" style={{ width: 20 }} />
                </ListItemIcon>
                <ListItemText primary="Eesti" />
              </ListItem>
              <ListItem button onClick={() => { changeLanguage("en"); handleDrawerClose(); }}>
                <ListItemIcon>
                  <img src="/en_flag.ico" alt="UK Flag" style={{ width: 20 }} />
                </ListItemIcon>
                <ListItemText primary="English" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
