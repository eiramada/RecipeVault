import _ from "lodash";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import markedRecipesExample from "../data_examples/markedRecipes.json";
import menuPlanExample from "../data_examples/menuPlan.json";
import shoppingListExample from "../data_examples/shoppingList.json";
import { fetchRecipes, updateRecipes } from "../services/recipeService";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const { t } = useTranslation();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuPlan, setMenuPlan] = useState(
    JSON.parse(localStorage.getItem("menuPlan")) || []
  );
  const [markedRecipeIds, setMarkedRecipesIds] = useState(
    JSON.parse(localStorage.getItem("markedRecipes")) || []
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
        console.error(t("errors.loadingRecipes"), error);
        setError(t("errors.loadingRecipes"));
      } finally {
        setLoading(false);
      }
    }, 300);

    debouncedFetchRecipes(searchQuery);

    return () => {
      debouncedFetchRecipes.cancel();
    };
  }, [searchQuery, filterRecipes, t]);

  const addNewRecipe = async (recipe) => {
    try {
      const allRecipes = await fetchRecipes();
      const updatedRecipes = [...allRecipes, recipe];
      const newRecipes = await updateRecipes(updatedRecipes);
      setRecipes(newRecipes);
      setError(null);
    } catch (error) {
      console.error(t("errors.addingRecipe"), error);
      setError(t("errors.addingRecipe"));
    }
  };

  const updateExistingRecipe = async (updatedRecipe) => {
    try {
      const index = recipes.findIndex(
        (recipe) => recipe.id === updatedRecipe.id
      );
      if (index === -1) throw new Error(t("recipeNotFound"));

      const updatedRecipes = recipes.map((recipe, i) =>
        i === index ? { ...recipe, ...updatedRecipe } : recipe
      );

      const newRecipes = await updateRecipes(updatedRecipes);
      setRecipes(newRecipes);
    } catch (error) {
      console.error(t("errors.updatingRecipes"), error);
      setError(t("errors.updatingRecipes"));
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

  const removeMenuPlan = () => {
    localStorage.removeItem("menuPlan");
  };

  const useExampleData = () => {
    localStorage.setItem("menuPlan", JSON.stringify(menuPlanExample));
    localStorage.setItem("shoppingList", JSON.stringify(shoppingListExample));
    localStorage.setItem("markedRecipes", JSON.stringify(markedRecipesExample));

    setMenuPlan(menuPlanExample);
    setMarkedRecipesIds(markedRecipesExample);
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
