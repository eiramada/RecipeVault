import { Container } from "@mui/material";
import React from "react";
import RecipeList from "../components/Recipes/RecipeList";
import SearchRecipe from "../components/Recipes/SearchRecipe";

const RecipesPage = () => {
  return (
    <>
      <SearchRecipe />
      <RecipeList />
    </>

    );
};

export default RecipesPage;
