import { Button, Container } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RecipeList from "../components/Recipes/RecipeList";
import SearchRecipe from "../components/Recipes/SearchRecipe";
import useDocumentTitle from "../hooks/useDocumentTitle";

const RecipesPage = () => {
  useDocumentTitle("recipes");
  const { t } = useTranslation();
  return (
    <>
      <SearchRecipe />
      <RecipeList />
      <Container>
        <Link to="/recipe/add">
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            {t("addNewRecipe")}
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default RecipesPage;
