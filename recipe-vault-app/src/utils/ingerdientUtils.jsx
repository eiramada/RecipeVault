export const validateField = (name, value, t) => {
  let error = "";
  if (name === "quantity" && value && isNaN(value)) {
    error = t("mustBeANumber");
  }
  return error;
};

export const handleFieldChange = (
  e,
  isNew,
  index,
  newIngredient,
  setNewIngredient,
  ingredients,
  onIngredientsChange,
  setErrors,
  t
) => {
  const { name, value } = e.target;
  const error = validateField(name, value, t);
  if (isNew) {
    setNewIngredient((prev) => ({ ...prev, [name]: value }));
  } else {
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: value } : ingredient
    );
    onIngredientsChange(updatedIngredients);
  }
  setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
};

export const handleAddIngredient = (
  newIngredient,
  ingredients,
  onIngredientsChange,
  setNewIngredient,
  setErrors,
  t
) => {
  const quantityError = validateField("quantity", newIngredient.quantity, t);
  const unitError = validateField("unit", newIngredient.unit, t);
  if (!quantityError && !unitError && newIngredient.name.trim()) {
    onIngredientsChange([...ingredients, newIngredient]);
    setNewIngredient({ name: "", quantity: "", unit: "", notes: "" });
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
      quantity: quantityError,
      unit: unitError,
    }));
  }
};

export const handleRemoveIngredient = (
  index,
  ingredients,
  onIngredientsChange
) => {
  onIngredientsChange(ingredients.filter((_, i) => i !== index));
};
