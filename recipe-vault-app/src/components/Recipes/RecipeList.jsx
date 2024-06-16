import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useLocation } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const getSearchQuery = (location) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("search")?.toLowerCase() || "";
  };
  const searchQuery = getSearchQuery(location);

  const recipesUrl = process.env.REACT_APP_RECIPES_DB_URL;

  useEffect(() => {
    fetchRecipes(recipesUrl).then((json) => {
      const filteredRecipes = filterRecipes(json, searchQuery);
      setRecipes(filteredRecipes);
    });
  }, [recipesUrl, searchQuery]);

 

  const fetchRecipes = async (url) => {
    const result = await fetch(url);
    const json = await result.json();
    return json;
  };

  const filterRecipes = (recipes, query) => {
    return recipes.filter((recipe) => {
      return (
        includesSearchQuery(recipe.title, query) ||
        includesSearchQuery(recipe.description, query) ||
        includesSearchQuery(getArrayString(recipe.tags), query) 
      );
    });
  };

  const includesSearchQuery = (field, query) => {
    return (field?.toLowerCase() || "").includes(query);
  };

  const getArrayString = (array) => {
    return (array || []).map(item => item.toLowerCase()).join(" ");
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;
