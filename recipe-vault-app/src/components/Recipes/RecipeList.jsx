import { Container, Grid } from "@mui/material";
import React from "react";
import RecipeCard from "./RecipeCard";
import recipesFromFile from "../../data/recipes.json";

const RecipeList = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {recipesFromFile.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;
