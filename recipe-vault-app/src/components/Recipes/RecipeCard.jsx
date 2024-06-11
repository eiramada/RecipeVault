import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.images[0]}
        alt={recipe.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
        <Link to={`/recipe/${recipe.id}`}>
          <Button size="small" color="primary">
            View Recipe
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
