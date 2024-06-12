import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Card
      sx={{
        width: 345,
        height: 350,
        margin: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={recipe.images[0]}
        alt={recipe.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
        <Stack direction="row" spacing={1}>
          {recipe.tags.map((tag, index) => (
            <Chip key={`${tag}-${index}`} label={tag} variant="outlined" />
          ))}
        </Stack>
      </CardContent>
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <Link to={`/recipe/${recipe.id}`}>
          <Button size="small" color="primary">
            View Recipe
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default RecipeCard;
