import _ from "lodash";
import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  addRecipe,
  fetchRecipes,
  updateRecipe,
} from "../services/recipeService";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const includesSearchQuery = (field, query) => {
    return (field?.toLowerCase() || "").includes(query.toLowerCase());
  };

  const getArrayString = (array) => {
    return (array || []).map((item) => item.toLowerCase()).join(" ");
  };

  const filterRecipes = useCallback((recipes, query) => {
    return recipes.filter((recipe) => {
      return (
        includesSearchQuery(recipe.title, query) ||
        includesSearchQuery(recipe.description, query) ||
        includesSearchQuery(getArrayString(recipe.tags), query)
      );
    });
  }, []);

  useEffect(() => {
    const debouncedFetchRecipes = _.debounce(async (query) => {
      setLoading(true);
      try {
        const allRecipes = await fetchRecipes();
        const filteredRecipes = filterRecipes(allRecipes, query);
        setRecipes(filteredRecipes);
        setError(null);
      } catch (error) {
        console.error("Error loading recipes:", error);
        setError("Error loading recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 300);

    debouncedFetchRecipes(searchQuery);

    // Cleanup function to cancel debounce on unmount
    return () => {
      debouncedFetchRecipes.cancel();
    };
  }, [searchQuery, filterRecipes]);

  const addNewRecipe = async (recipe) => {
    try {
      const newRecipe = await addRecipe(recipe);
      setRecipes([...recipes, newRecipe]);
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError("Error adding recipe. Please try again later.");
    }
  };

  const updateExistingRecipe = async (updatedRecipe) => {
    try {
      const updated = await updateRecipe(updatedRecipe);
      setRecipes(
        recipes.map((recipe) => (recipe.id === updated.id ? updated : recipe))
      );
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Error updating recipe. Please try again later.");
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        searchQuery,
        setSearchQuery,
        addNewRecipe,
        updateExistingRecipe,
        loading,
        error,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };

