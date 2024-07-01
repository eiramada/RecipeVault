import { Box, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import CarouselGallery from "../components/Common/CarouselGallery";
import TagList from "../components/Common/TagList";
import { RecipeContext } from "../contexts/RecipeContext";

const HomePage = () => {
  const { t } = useTranslation();
  const { recipes } = useContext(RecipeContext);

  const allTags = recipes.reduce((acc, recipe) => {
    recipe.tags &&
      recipe.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
    return acc;
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("featuredRecipesTitle")}
        </Typography>
        <Box>
          <CarouselGallery
            images={recipes.map((recipe) =>
              recipe.images ? recipe.images[0] : "/Placeholder.webp"
            )}
            titles={recipes.map((recipe) => recipe.title)}
            links={recipes.map((recipe) => `/recipe/${recipe.id}`)}
          />
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("popularTagsTitle")}
        </Typography>
        <TagList tags={allTags.sort()} />
      </Box>
    </Container>
  );
};

export default HomePage;
