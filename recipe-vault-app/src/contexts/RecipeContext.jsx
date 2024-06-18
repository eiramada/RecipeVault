import _ from "lodash";
import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  addRecipe,
  fetchRecipes,
  updateRecipes,
} from "../services/recipeService";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuPlan, setMenuPlan] = useState(
    () => JSON.parse(localStorage.getItem("menuPlan")) || []
  );
  const [markedRecipeIds, setMarkedRecipesIds] = useState(
    () => JSON.parse(localStorage.getItem("markedRecipes")) || []
  );

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

  const updateExistingRecipe = async (updatedRecipes) => {
    try {
      const updated = await updateRecipes(updatedRecipes);
      setRecipes(updated);
    } catch (error) {
      console.error("Error updating recipes:", error);
      setError("Error updating recipes. Please try again later.");
    }
  };

  const markRecipe = (id) => {
    const updatedMarkedRecipes = markedRecipeIds.includes(id)
      ? markedRecipeIds.filter((recipeId) => recipeId !== id)
      : [...markedRecipeIds, id];
    setMarkedRecipesIds(updatedMarkedRecipes);
    localStorage.setItem("markedRecipes", JSON.stringify(updatedMarkedRecipes));
  };

  const isRecipeMarked = (id) => {
    return markedRecipeIds.includes(id);
  };

  const addToMenuPlan = (recipe, day, meal) => {
    const updatedMenuPlan = [...menuPlan, { day, meal, recipe }];
    setMenuPlan(updatedMenuPlan);
    localStorage.setItem("menuPlan", JSON.stringify(updatedMenuPlan));
  };

  const removeFromMenuPlan = (day) => {
    const updatedMenuPlan = menuPlan.filter((item) => item.day !== day);
    setMenuPlan(updatedMenuPlan);
    localStorage.setItem("menuPlan", JSON.stringify(updatedMenuPlan));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        searchQuery,
        menuPlan,
        setSearchQuery,
        addNewRecipe,
        updateExistingRecipe,
        loading,
        error,
        markRecipe,
        isRecipeMarked,
        addToMenuPlan,
        removeFromMenuPlan,
        markedRecipeIds,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };

