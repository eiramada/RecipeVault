import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchRecipes, updateRecipes } from "../services/recipeService";

const useRecipes = (searchQuery) => {
  const { t } = useTranslation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { recipes, loading, error, addNewRecipe, updateExistingRecipe };
};

export default useRecipes;
