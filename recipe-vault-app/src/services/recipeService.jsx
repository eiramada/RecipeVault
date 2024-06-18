const recipesUrl = process.env.REACT_APP_RECIPES_DB_URL;

export const fetchRecipes = async () => {
  try {
    const response = await fetch(recipesUrl);
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const addRecipe = async (recipe) => {
  try {
    const response = await fetch(recipesUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Failed to add recipe");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
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
      throw new Error("Failed to update recipes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating recipes:", error);
    throw error;
  }
};
