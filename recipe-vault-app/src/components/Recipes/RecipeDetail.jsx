import {
  Button,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link, useParams } from "react-router-dom";
import recipesFromFile from "../../data/recipes.json";

function RecipeDetail() {
  const { id } = useParams();

  const recipe = recipesFromFile.find((r) => r.id === id);

  if (!recipe) {
    return <div>Loading...</div>;
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
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Images
      </Typography>
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

      <Stack direction="row" spacing={1}>
        {recipe.tags.map((tag) => (
          <Chip key={tag} label={tag} variant="outlined" />
        ))}
      </Stack>
    </Container>
  );
}

export default RecipeDetail;