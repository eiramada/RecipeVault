import { Paper, Typography } from "@mui/material";
import React from "react";
import Ingredients from "../Common/Ingredients";

const RecipeIngredients = ({ ingredients, onIngredientsChange }) => {
  return (
    <>
      <Typography variant="h6" component="h3" gutterBottom>
        Ingredients
      </Typography>
      <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
        <Ingredients
          ingredients={ingredients}
          onIngredientsChange={onIngredientsChange}
        />
      </Paper>
    </>
  );
};

export default RecipeIngredients;
