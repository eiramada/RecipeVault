import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import CarouselGallery from "../components/Common/CarouselGallery";
import TagList from "../components/Common/TagList";
import { RecipeContext } from "../contexts/RecipeContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const RecipePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { recipes, loading, error, markRecipe, isRecipeMarked } =
    useContext(RecipeContext);
  const recipe = recipes.find((r) => Number(r.id) === Number(id));
  const isMarked = isRecipeMarked(recipe?.id);
  useDocumentTitle(recipe?.title || "");

  useEffect(() => {
    if (recipe) {
      document.title = `${recipe.title} - ${t("appTitle")}`;
    }
  }, [recipe, t]);

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!recipe) {
    return <Typography>{t("recipeNotFound")}</Typography>;
  }

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4" component="h2" gutterBottom>
          {recipe.title}
        </Typography>
        <Link to={`/edit/${recipe.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 1, sm: 0 } }}
          >
            {t("editRecipe")}
          </Button>
        </Link>
        <Button
          onClick={() => markRecipe(recipe.id)}
          size="small"
          color={isMarked ? "secondary" : "primary"}
          sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 1, sm: 0 } }}
        >
          {isMarked ? t("removeFromMenuPlan") : t("addToMenuPlan")}
        </Button>
      </Box>

      <CarouselGallery images={recipe.images || ["/Placeholder.webp"]} />

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>
            <strong>{recipe.description}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>{t("servings")}:</strong> {recipe.servings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>{t("prepTime")}:</strong> {recipe.prepTime} mins
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>{t("totalTime")}:</strong> {recipe.totalTime} mins
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>{t("cookTime")}:</strong> {recipe.cookTime} mins
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" component="h3" gutterBottom mt={2}>
        {t("ingredients")}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <List>
          {recipe.ingredients &&
            recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${ingredient.name} - ${ingredient.quantity} ${
                    ingredient.unit
                  } ${ingredient.notes ? `(${ingredient.notes})` : ""}`}
                />
              </ListItem>
            ))}
        </List>
      </Paper>

      <Typography variant="h6" component="h3" gutterBottom>
        {t("instructions")}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <List>
          {recipe.instructions &&
            recipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText primary={instruction.description} />
              </ListItem>
            ))}
        </List>
      </Paper>

      <TagList tags={recipe.tags} />

      <Typography variant="h6" component="h3" gutterBottom>
        {t("images")}
      </Typography>
      {recipe.images?.length > 0 ? (
        <Grid container spacing={2}>
          {recipe.images.map((image, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <img
                src={image}
                alt={`Recipe ${index + 1}`}
                style={{ width: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <img src="/Placeholder.webp" alt="Placeholder" style={{ width: "100%" }} />
      )}
    </Container>
  );
};

export default RecipePage;
