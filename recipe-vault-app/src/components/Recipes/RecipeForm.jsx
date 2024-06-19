import React from "react";
import { Grid, Paper, TextField } from "@mui/material";

const RecipeForm = ({ titleRef, descriptionRef, authorRef, servingsRef, prepTimeRef, cookTimeRef, errors }) => (
  <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Title"
          inputRef={titleRef}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Description"
          inputRef={descriptionRef}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Author"
          inputRef={authorRef}
          fullWidth
          margin="normal"
          error={!!errors.author}
          helperText={errors.author}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Servings"
          type="number"
          inputRef={servingsRef}
          fullWidth
          margin="normal"
          error={!!errors.servings}
          helperText={errors.servings}
        />
        <TextField
          label="Prep Time (mins)"
          type="number"
          inputRef={prepTimeRef}
          fullWidth
          margin="normal"
          error={!!errors.prepTime}
          helperText={errors.prepTime}
        />
        <TextField
          label="Cook Time (mins)"
          type="number"
          inputRef={cookTimeRef}
          fullWidth
          margin="normal"
          error={!!errors.cookTime}
          helperText={errors.cookTime}
        />
      </Grid>
    </Grid>
  </Paper>
);

export default RecipeForm;
