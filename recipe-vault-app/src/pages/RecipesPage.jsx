import React from "react";
import RecipeList from "../components/Recipes/RecipeList";
import SearchRecipe from "../components/Recipes/SearchRecipe";
import useDocumentTitle from "../hooks/useDocumentTitle";

const RecipesPage = () => {
  useDocumentTitle("recipes");
  return (
    <>
      <SearchRecipe />
      <RecipeList />
    </>
  );
};

export default RecipesPage;
