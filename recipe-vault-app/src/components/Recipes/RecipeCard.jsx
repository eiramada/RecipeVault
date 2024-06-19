import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";
import TagList from "../Common/TagList";

const RecipeCard = ({ recipe }) => {
  const { markRecipe, isRecipeMarked, setSearchQuery } = useContext(RecipeContext);
  const isMarked = isRecipeMarked(recipe.id);
  const navigate = useNavigate();

  const handleMarkRecipe = (event) => {
    event.stopPropagation();
    markRecipe(recipe.id);
  };

  const handleTagClick = (event, tag) => {
    event.stopPropagation();
    setSearchQuery(tag);
    navigate(`/recipes`);
  };

  return (
    <Card
      sx={{
        width: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 2,
      }}
    >
      <Link
        to={`/recipe/${recipe.id}`}
        style={{ textDecoration: "none", flexGrow: 1 }}
      >
        <CardMedia
          component="img"
          height="140"
          image={(recipe.images && recipe.images[0]) || "Placeholder.webp"}
          alt={recipe.title}
        />
        <Divider />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: "48px" }}
          >
            {recipe.description}
          </Typography>
        </CardContent>
      </Link>
      <Box sx={{ padding: 2 }}>
        <TagList tags={recipe.tags} onTagClick={handleTagClick} />
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button
            onClick={handleMarkRecipe}
            size="small"
            color={isMarked ? "secondary" : "primary"}
            sx={{ width: "100%" }}
          >
            {isMarked ? "Remove from Menu Plan" : "Add to Menu Plan"}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default RecipeCard;
