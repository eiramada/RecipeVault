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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
};

export const updateRecipe = async (recipe) => {
  try {
    const response = await fetch(`${recipesUrl}/${recipe.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

// export const deleteRecipe = async (id) => {
//   try {
//     const response = await fetch(`${recipesUrl}/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete recipe');
//     }
//   } catch (error) {
//     console.error("Error deleting recipe:", error);
//     throw error;
//   }
// };
