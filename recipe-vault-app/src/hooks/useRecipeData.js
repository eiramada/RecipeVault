import { useCallback, useEffect, useState } from "react";

export const useRecipeData = (recipes, id, isEditMode) => {
  const [existingRecipe, setExistingRecipe] = useState(null);

  const findExistingRecipe = useCallback(() => {
    if (isEditMode && id) {
      const recipe = recipes.find((r) => Number(r.id) === Number(id));
      setExistingRecipe(recipe);
    }
  }, [recipes, id, isEditMode]);

  useEffect(() => {
    findExistingRecipe();
  }, [findExistingRecipe]);

  const populateFormWithExistingRecipe = useCallback(
    (refs) => {
      if (existingRecipe) {
        refs.titleRef.current.value = existingRecipe.title || "";
        refs.descriptionRef.current.value = existingRecipe.description || "";
        refs.servingsRef.current.value = existingRecipe.servings || "";
        refs.prepTimeRef.current.value = existingRecipe.prepTime || "";
        refs.cookTimeRef.current.value = existingRecipe.cookTime || "";
        refs.authorRef.current.value = existingRecipe.author || "";
        refs.setIngredients(existingRecipe.ingredients || []);
        refs.setInstructions(existingRecipe.instructions || []);
        refs.setImages(existingRecipe.images || []);
        refs.setTags(existingRecipe.tags || []);
      } else {
         refs.titleRef.current.value = "";
        refs.descriptionRef.current.value = "";
        refs.servingsRef.current.value = "";
        refs.prepTimeRef.current.value = "";
        refs.cookTimeRef.current.value = "";
        refs.authorRef.current.value = "";
        refs.setIngredients([]);
        refs.setInstructions([]);
        refs.setImages([]);
        refs.setTags([]);
      }
    },
    [existingRecipe]
  );

  return {
    existingRecipe,
    setExistingRecipe,
    findExistingRecipe,
    populateFormWithExistingRecipe,
  };
};
