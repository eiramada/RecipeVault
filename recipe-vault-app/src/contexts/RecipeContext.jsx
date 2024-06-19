import _ from "lodash";
import React, { createContext, useCallback, useEffect, useState } from "react";
import markedRecipesExample from "../data_examples/markedRecipes.json";
import menuPlanExample from "../data_examples/menuPlan.json";
import shoppingListExample from "../data_examples/shoppingList.json";
import { fetchRecipes, updateRecipes } from "../services/recipeService";

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

  const includesSearchQuery = (field, query) =>
    (field?.toLowerCase() || "").includes(query.toLowerCase());

  const getArrayString = (array) =>
    (array || []).map((item) => item.toLowerCase()).join(" ");

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

    return () => {
      debouncedFetchRecipes.cancel();
    };
  }, [searchQuery, filterRecipes]);

  const addNewRecipe = async (recipe) => {
    try {
      const allRecipes = await fetchRecipes();
      const updatedRecipes = [...allRecipes, recipe];
      const newRecipes = await updateRecipes(updatedRecipes);
      setRecipes(newRecipes);
      setError(null);
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError("Error adding recipe. Please try again later.");
    }
  };

  const updateExistingRecipe = async (updatedRecipe) => {
    try {
      const index = recipes.findIndex(
        (recipe) => recipe.id === updatedRecipe.id
      );
      if (index === -1)
        throw new Error(`Recipe with ID ${updatedRecipe.id} not found`);

      const updatedRecipes = recipes.map((recipe, i) =>
        i === index ? { ...recipe, ...updatedRecipe } : recipe
      );

      const newRecipes = await updateRecipes(updatedRecipes);
      setRecipes(newRecipes);
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

  const isRecipeMarked = (id) => markedRecipeIds.includes(id);

  const addToMenuPlan = (recipeId, day, meal) => {
    const updatedMenuPlan = [...menuPlan, { day, meal, recipeId }];
    setMenuPlan(updatedMenuPlan);
    localStorage.setItem("menuPlan", JSON.stringify(updatedMenuPlan));
  };

  const removeFromMenuPlan = (recipeId, day, meal) => {
    const updatedMenuPlan = menuPlan.filter(
      (item) =>
        !(item.day === day && item.meal === meal && item.recipeId === recipeId)
    );
    setMenuPlan(updatedMenuPlan);
    localStorage.setItem("menuPlan", JSON.stringify(updatedMenuPlan));
  };

  const removeMenuPlan = () => {
    localStorage.removeItem("menuPlan");
  };

  const useExampleData = () => {
    localStorage.setItem("menuPlan", JSON.stringify(menuPlanExample));
    localStorage.setItem("shoppingList", JSON.stringify(shoppingListExample));
    localStorage.setItem("markedRecipes", JSON.stringify(markedRecipesExample));
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
        setMenuPlan,
        removeMenuPlan,
        useExampleData,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };

