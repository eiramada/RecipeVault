import { Paper, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import DraggableList from "../Common/DraggableList";

const RecipeInstructions = ({ instructions, onInstructionsChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" component="h3" gutterBottom>
        {t("instructions")}
      </Typography>
      <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
        <DraggableList
          items={instructions}
          onItemsChange={onInstructionsChange}
        />
      </Paper>
    </>
  );
};

export default RecipeInstructions;
