import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchMarkedRecipes,
  updateMarkedRecipes,
} from "../services/markedRecipeService";
import { UserContext } from "./UserContext";

const MarkedRecipeContext = createContext();

const MarkedRecipeProvider = ({ children }) => {
  const { t } = useTranslation();
  const { userId } = useContext(UserContext);
  const [markedRecipeIds, setMarkedRecipeIds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarkedRecipes = async () => {
      try {
        const data = await fetchMarkedRecipes(userId);
        setMarkedRecipeIds(data);
      } catch (err) {
        console.error(err);
        setError(t("errors.fetchingMarkedRecipes"));
      }
    };

    loadMarkedRecipes();
  }, [userId, t]);

  const markRecipe = async (id) => {
    const updatedMarkedRecipes = markedRecipeIds.includes(id)
      ? markedRecipeIds.filter((recipeId) => recipeId !== id)
      : [...markedRecipeIds, id];

    setMarkedRecipeIds(updatedMarkedRecipes);
    try {
      await updateMarkedRecipes(userId, updatedMarkedRecipes);
    } catch (error) {
      console.error(t("errors.updatingRecipes"), error);
      setError(t("errors.updatingRecipes"));
    }
  };

  return (
    <MarkedRecipeContext.Provider
      value={{
        markedRecipeIds,
        markRecipe,
        error,
      }}
    >
      {children}
    </MarkedRecipeContext.Provider>
  );
};

export { MarkedRecipeContext, MarkedRecipeProvider };

