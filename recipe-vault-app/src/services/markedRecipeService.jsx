import { t } from "i18next";

const markedRecipesUrl = process.env.REACT_APP_MARKED_RECIPES_DB_URL;

export const fetchMarkedRecipes = async (userId) => {
  try {
    const response = await fetch(markedRecipesUrl);
    const data = await response.json();

    if (!data || !data[userId]) {
      return [];
    }

    return data[userId];
  } catch (error) {
    console.error(t("errors.fetchingMarkedRecipes"), error);
    throw new Error(t("errors.fetchingMarkedRecipes"));
  }
};

export const updateMarkedRecipes = async (userId, markedRecipes) => {
  try {
    const response = await fetch(markedRecipesUrl);
    let data = await response.json();

    if (!data) {
      data = {};
    }
    data[userId] = markedRecipes;

    const updateResponse = await fetch(markedRecipesUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!updateResponse.ok) {
      throw new Error(t("errors.failedToUpdate"));
    }

    const updatedData = await updateResponse.json();
    return updatedData[userId];
  } catch (error) {
    console.error(t("errors.updatingMarkedRecipes"), error);
    throw new Error(t("errors.updatingMarkedRecipes"));
  }
};
