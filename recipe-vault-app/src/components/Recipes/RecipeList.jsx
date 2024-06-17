import { Container, Grid } from "@mui/material";
import React, { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const { recipes } = useContext(RecipeContext);

  return (
    <Container>
      <Grid container spacing={4}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;
