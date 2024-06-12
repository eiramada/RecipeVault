import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const recipesUrl = process.env.REACT_APP_RECIPES_DB_URL;

  useEffect(() => {
    fetch(recipesUrl)
      .then((result) => result.json())
      .then((json) => {
        setRecipes(json || []);
        console.log(json);
      });
  }, [recipesUrl]);

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
