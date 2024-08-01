import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import RecipeEditor from "../components/Recipes/RecipeEditor";
const RecipeEditorPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  return (
    <Box>
      <RecipeEditor isEditMode={isEditMode} />
    </Box>
  );
};

export default RecipeEditorPage;
