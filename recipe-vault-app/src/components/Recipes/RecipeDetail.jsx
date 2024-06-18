import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import { Link, useParams } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";

function RecipeDetail() {
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
      <Typography variant="h6" component="h3" gutterBottom>
        Images
      </Typography>
      {recipe.images && (
        <Carousel>
          {recipe.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Recipe ${index + 1}`}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </Carousel>
      )}
      {!recipe.images && (
        <img
          src="/Placeholder.webp"
          alt="Placeholder"
          style={{ width: "100%" }}
        />
      )}
      <Typography variant="body1" gutterBottom>
        <strong>{recipe.description}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Servings:</strong> {recipe.servings}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Prep Time:</strong> {recipe.prepTime} mins
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Cook Time:</strong> {recipe.cookTime} mins
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Total Time:</strong> {recipe.totalTime} mins
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Author:</strong> {recipe.author}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Created At:</strong> {new Date(recipe.createdAt).toDateString()}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Updated At:</strong> {new Date(recipe.updatedAt).toDateString()}
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom>
        Ingredients
      </Typography>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${ingredient.name} - ${ingredient.quantity} ${
                ingredient.unit
              } ${ingredient.notes ? `(${ingredient.notes})` : ""}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" component="h3" gutterBottom>
        Instructions
      </Typography>
      <List>
        {recipe.instructions.map((instruction, index) => (
          <ListItem key={index}>
            <ListItemText primary={instruction.description} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" component="h3" gutterBottom>
        Images
      </Typography>
      {recipe.images && (
        <Grid container spacing={2}>
          {recipe.images.map((image, index) => (
            <Grid item xs={6} key={index}>
              <img
                src={image}
                alt={`Recipe ${index + 1}`}
                style={{ width: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {!recipe.images && (
        <img
          src="/Placeholder.webp"
          alt="Placeholder"
          style={{ width: "100%" }}
        />
      )}

      <Stack direction="row" spacing={1}>
        {recipe.tags.map((tag, index) => (
          <Chip label={tag} key={index} variant="outlined" />
        ))}
      </Stack>
    </Container>
  );
}

export default RecipeDetail;
