export const generateNewId = (recipes) => {
  return recipes.length ? Number(recipes[recipes.length - 1].id) + 1 : 1;
};

export const createUpdatedRecipe = (
  formValues,
  isEditMode,
  existingRecipe,
  ingredients,
  instructions,
  images,
  tags
) => {
  const { title, description, servings, prepTime, cookTime, author } =
    formValues;
  return {
    id: isEditMode ? existingRecipe.id : generateNewId(),
    title,
    description,
    servings: Number(servings),
    prepTime: Number(prepTime),
    cookTime: Number(cookTime),
    totalTime: Number(prepTime) + Number(cookTime),
    author,
    createdAt: isEditMode ? existingRecipe.createdAt : new Date(),
    updatedAt: new Date(),
    ingredients,
    instructions,
    images,
    tags,
  };
};
