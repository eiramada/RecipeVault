//utils/validation.jsx
export const validateFields = (
  titleRef,
  descriptionRef,
  servingsRef,
  prepTimeRef,
  cookTimeRef,
  setErrors,
  t
) => {
  const newErrors = {};
  if (!titleRef.current.value)
    newErrors.title = t("validationErrors.titleRequired");
  if (!descriptionRef.current.value)
    newErrors.description = t("validationErrors.descriptionRequired");
  if (
    !servingsRef.current.value ||
    isNaN(servingsRef.current.value) ||
    servingsRef.current.value <= 0
  )
    newErrors.servings = t("validationErrors.positiveNumber");
  if (
    !prepTimeRef.current.value ||
    isNaN(prepTimeRef.current.value) ||
    prepTimeRef.current.value <= 0
  )
    newErrors.prepTime = t("validationErrors.positiveNumber");
  if (
    !cookTimeRef.current.value ||
    isNaN(cookTimeRef.current.value) ||
    cookTimeRef.current.value <= 0
  )
    newErrors.cookTime = t("validationErrors.positiveNumber");

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
