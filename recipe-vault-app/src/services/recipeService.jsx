import { t } from "i18next";

const recipesUrl = process.env.REACT_APP_RECIPES_DB_URL;

export const fetchRecipes = async () => {
  try {
    const response = await fetch(recipesUrl);
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error(t("errors.fetchingRecipes"), error);
    throw new Error(t("errors.fetchingRecipes"));
  }
};

export const updateRecipes = async (recipes) => {
  try {
    const response = await fetch(recipesUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipes),
    });
    if (!response.ok) {
      throw new Error(t("errors.failedToUpdate"));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(t("errors.updatingRecipes"), error);
    throw new Error(t("errors.updatingRecipes"));
  }
};
