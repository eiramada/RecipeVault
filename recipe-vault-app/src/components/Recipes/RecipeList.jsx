import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
import RecipeCard from "./RecipeCard";
import SearchRecipe from "./SearchRecipe";

const RecipeList = () => {
  const { recipes, loading, error } = useContext(RecipeContext);

  return (
    <>
      <SearchRecipe />

      {loading ? (
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress />
          </div>
        </Container>
      ) : error ? (
        <Container>
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        </Container>
      ) : (
        <Container>
          <Grid container spacing={4}>
            {recipes.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default RecipeList;
