import { Paper, Typography } from "@mui/material";
import React from "react";
import EditableTagList from "../Common/EditableTagList";
import ImageList from "../Common/ImageList";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import { useTranslation } from "react-i18next";

const RecipeComponents = ({
  ingredients,
  setIngredients,
  instructions,
  setInstructions,
  images,
  setImages,
  tags,
  setTags,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <RecipeIngredients
        ingredients={ingredients}
        onIngredientsChange={setIngredients}
      />
      <RecipeInstructions
        instructions={instructions}
        onInstructionsChange={setInstructions}
      />
      <EditableTagList tagsList={tags} setTags={setTags} />
      <Typography variant="h6" component="h3" gutterBottom>
        {t("images")}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, my: 2 }}>
        <ImageList images={images} onImagesChange={setImages} />
      </Paper>
    </>
  );
};

export default RecipeComponents;
