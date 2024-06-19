import { Paper, Typography } from "@mui/material";
import React from "react";
import Instructions from "../Common/Instructions";

const RecipeInstructions = ({ instructions, onInstructionsChange }) => (
  <>
    <Typography variant="h6" component="h3" gutterBottom>
      Instructions
    </Typography>
    <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
      <Instructions
        instructions={instructions}
        onInstructionsChange={onInstructionsChange}
      />
    </Paper>
  </>
);

export default RecipeInstructions;
