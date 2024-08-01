import { Grid, Paper, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const RecipeForm = ({
  titleRef,
  descriptionRef,
  authorRef,
  servingsRef,
  prepTimeRef,
  cookTimeRef,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label={t("title")}
            inputRef={titleRef}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            label={t("description")}
            inputRef={descriptionRef}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label={t("author")}
                inputRef={authorRef}
                fullWidth
                margin="normal"
                error={!!errors.author}
                helperText={errors.author}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("servings")}
                type="number"
                inputRef={servingsRef}
                fullWidth
                margin="normal"
                error={!!errors.servings}
                helperText={errors.servings}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("prepTime")}
                type="number"
                inputRef={prepTimeRef}
                fullWidth
                margin="normal"
                error={!!errors.prepTime}
                helperText={errors.prepTime}
                sx={{ mt: 0 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("cookTime")}
                type="number"
                inputRef={cookTimeRef}
                fullWidth
                margin="normal"
                error={!!errors.cookTime}
                helperText={errors.cookTime}
                sx={{ mt: 0 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecipeForm;
