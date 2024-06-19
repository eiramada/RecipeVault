import {
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
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";
import CarouselGallery from "../Common/CarouselGallery";
import TagList from "../Common/TagList";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes, loading, error, markRecipe, isRecipeMarked } =
    useContext(RecipeContext);
  const recipe = recipes.find((r) => Number(r.id) === Number(id));
  const isMarked = isRecipeMarked(recipe?.id);

  if (loading) {
    return (
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
    return <div>Recipe not found</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        {recipe.title}
        <Link to={`/edit/${recipe.id}`}>
          <Button size="small" color="primary">
            Edit Recipe
          </Button>
        </Link>
        <Button
          onClick={() => markRecipe(recipe.id)}
          size="small"
          color={isMarked ? "secondary" : "primary"}
        >
          {isMarked ? "Remove from Menu Plan" : "Add to Menu Plan"}
        </Button>
      </Typography>

      <CarouselGallery images={recipe.images || ["/Placeholder.webp"]} />

      <Grid container spacing={2} style={{ marginTop: "8px" }}>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>
            <strong>{recipe.description}</strong>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "8px" }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Servings:</strong> {recipe.servings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Prep Time:</strong> {recipe.prepTime} mins
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Total Time:</strong> {recipe.totalTime} mins
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Cook Time:</strong> {recipe.cookTime} mins
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        style={{ marginTop: "16px" }}
      >
        Ingredients
      </Typography>
      <Paper elevation={3} style={{ padding: "8px", margin: "8px 0" }}>
        <List>
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
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
        Instructions
      </Typography>
      <Paper elevation={3} style={{ padding: "8px", margin: "8px 0" }}>
        <List>
          {recipe.instructions && recipe.instructions.map((instruction, index) => (
            <ListItem key={index}>
              <ListItemText primary={instruction.description} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <TagList tags={recipe.tags} />

      <Typography variant="h6" component="h3" gutterBottom>
        Images
      </Typography>
      {recipe.images?.length > 0 ? (
        <Grid container spacing={2}>
          {recipe.images.map((image, index) => (
            <Grid item xs={6} key={index}>
              <img
                src={image}
                alt={`Recipe ${index + 1}`}
                style={{ width: 400 }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <img src="/Placeholder.webp" alt="Placeholder" style={{ width: 400 }} />
      )}

  
    </Container>
  );
};

export default RecipeDetail;
