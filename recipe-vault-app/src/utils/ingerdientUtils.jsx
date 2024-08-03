export const validateField = (name, value, t) => {
  let error = "";
  if (name === "quantity" && value && isNaN(value)) {
    error = t("mustBeANumber");
  }
  return error;
};

export const handleFieldChange = (
  event,
  isNew,
  index,
  newIngredient,
  setNewIngredient,
  ingredients,
  onIngredientsChange,
  setErrors,
  t
) => {
  const { name, value } = event.target;
  let updatedValue = value;

  if (name === "quantity") {
    updatedValue = value.replace(",", ".");
    if (isNaN(updatedValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [index]: {
          ...prevErrors[index],
          quantity: t("validationErrors.positiveNumber"),
        },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [index]: { ...prevErrors[index], quantity: "" },
      }));
    }
  }

  if (isNew) {
    setNewIngredient((prevIngredient) => ({
      ...prevIngredient,
      [name]: updatedValue,
    }));
  } else {
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: updatedValue } : ingredient
    );
    onIngredientsChange(updatedIngredients);
  }
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
    setErrors({});
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
      new: { quantity: quantityError, unit: unitError },
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
