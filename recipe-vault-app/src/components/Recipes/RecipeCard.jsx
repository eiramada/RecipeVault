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
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { MarkedRecipeContext } from "../../contexts/MarkedRecipesContext";
import { RecipeContext } from "../../contexts/RecipeContext";
import TagList from "../Common/TagList";

const RecipeCard = ({ recipe }) => {
  const { t } = useTranslation();
  const { setSearchQuery } = useContext(RecipeContext);
  const { markRecipe, markedRecipeIds } = useContext(MarkedRecipeContext);
  const isMarked = markedRecipeIds.includes(recipe.id);
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

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <Card
      sx={{
        width: 345,
        height: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 1,
        padding: 1,
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
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
          sx={{ objectFit: "cover" }}
        />
        <Divider />
        <CardContent sx={{ paddingBottom: "8px !important" }}>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              minHeight: 48,
              maxHeight: 48,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {truncateDescription(recipe.description, 80)}
          </Typography>
        </CardContent>
      </Link>
      <Box
        sx={{
          padding: 1,
          maxHeight: 60,
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <TagList tags={recipe.tags} onTagClick={handleTagClick} maxTags={3} />
      </Box>
      <Box sx={{ textAlign: "center", marginTop: 1 }}>
        <Button onClick={handleMarkRecipe} size="small">
          {isMarked ? t("removeFromMenuPlan") : t("addToMenuPlan")}
        </Button>
      </Box>
    </Card>
  );
};

export default RecipeCard;
