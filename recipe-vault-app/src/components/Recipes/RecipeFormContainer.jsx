import React from "react";
import RecipeForm from "./RecipeForm";

const RecipeFormContainer = ({
  titleRef,
  descriptionRef,
  authorRef,
  servingsRef,
  prepTimeRef,
  cookTimeRef,
  errors,
}) => {
  return (
    <RecipeForm
      titleRef={titleRef}
      descriptionRef={descriptionRef}
      authorRef={authorRef}
      servingsRef={servingsRef}
      prepTimeRef={prepTimeRef}
      cookTimeRef={cookTimeRef}
      errors={errors}
    />
  );
};

export default RecipeFormContainer;
