import { Paper, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useTranslation } from "react-i18next";
import IngredientsMobile from "../Common/IngredientsMobile";
import IngredientsWide from "../Common/IngredientsWide";

const RecipeIngredients = ({ ingredients, onIngredientsChange }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Typography variant="h6" component="h3" gutterBottom>
        {t("ingredients")}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, my: 2 }}>
        {isMobile ? (
          <IngredientsMobile
            ingredients={ingredients}
            onIngredientsChange={onIngredientsChange}
          />
        ) : (
          <IngredientsWide
            ingredients={ingredients}
            onIngredientsChange={onIngredientsChange}
          />
        )}
      </Paper>
    </>
  );
};

export default RecipeIngredients;
