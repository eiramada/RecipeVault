import { Container } from "@mui/material";
import React from "react";
import styles from "../../css/RecipeEditor.module.css";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container className={styles.noPaddingMobile}>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
