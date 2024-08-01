import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";
import styles from "../../css/RecipeEditor.module.css";
import { useRecipeData } from "../../hooks/useRecipeData";
import {
  createUpdatedRecipe,
  validateFields,
} from "../../utils/recipeFormUtils";
import LoadingSpinner from "../Common/LoadingSpinner";
import MessageAlert from "../Common/MessageAlert";
import RecipeComponents from "./RecipeComponents";
import RecipeFormContainer from "./RecipeFormContainer";

const RecipeEditor = ({ isEditMode = false }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, addNewRecipe, updateExistingRecipe } =
    useContext(RecipeContext);
  const {
    existingRecipe,
    setExistingRecipe,
    findExistingRecipe,
    populateFormWithExistingRecipe,
  } = useRecipeData(recipes, id, isEditMode);

  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const servingsRef = useRef();
  const prepTimeRef = useRef();
  const cookTimeRef = useRef();
  const authorRef = useRef();

  useEffect(() => {
    if (isEditMode && existingRecipe) {
      populateFormWithExistingRecipe({
        titleRef,
        descriptionRef,
        servingsRef,
        prepTimeRef,
        cookTimeRef,
        authorRef,
        setIngredients,
        setInstructions,
        setImages,
        setTags,
      });
    }
  }, [isEditMode, existingRecipe, populateFormWithExistingRecipe]);

  useEffect(() => {
    const appName = t("appTitle");
    if (isEditMode && existingRecipe) {
      document.title = `${t("recipeTitle.edit")} ${
        existingRecipe.title
      } - ${appName}`;
    } else {
      document.title = `${t("recipeTitle.addNew")} - ${appName}`;
    }
  }, [isEditMode, existingRecipe, t]);

  const saveRecipe = async () => {
    if (
      !validateFields(
        titleRef,
        descriptionRef,
        servingsRef,
        prepTimeRef,
        cookTimeRef,
        setErrors,
        t
      )
    )
      return;

    setLoading(true);
    const formValues = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      servings: servingsRef.current.value,
      prepTime: prepTimeRef.current.value,
      cookTime: cookTimeRef.current.value,
      author: authorRef.current.value,
    };

    const updatedRecipe = createUpdatedRecipe(
      formValues,
      isEditMode,
      existingRecipe,
      ingredients,
      instructions,
      images,
      tags
    );

    try {
      if (isEditMode) {
        await updateExistingRecipe(updatedRecipe);
      } else {
        await addNewRecipe(updatedRecipe);
      }
      setMessage(t("recipeSavedSuccess"));
      navigate(`/recipe/${updatedRecipe.id}`);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setMessage(t("recipeSaveError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.noPaddingMobile}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {message && (
            <MessageAlert message={message} setMessage={setMessage} />
          )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ flexGrow: 1 }}
            >
              {isEditMode ? t("recipeTitle.edit") : t("recipeTitle.addNew")}
            </Typography>
            <Box display="flex" alignItems="center">
              {existingRecipe && (
                <Link
                  to={`/recipe/${existingRecipe.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button size="small" color="primary" sx={{ ml: 2 }}>
                    {t("backButton")}
                  </Button>
                </Link>
              )}
              {!existingRecipe && (
                <Link to={`/recipes`} style={{ textDecoration: "none" }}>
                  <Button size="small" color="primary" sx={{ ml: 2 }}>
                    {t("backButton")}
                  </Button>
                </Link>
              )}
              <Button
                onClick={saveRecipe}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
              >
                {t("saveButtonLabel")}
              </Button>
            </Box>
          </Box>
          <RecipeFormContainer
            titleRef={titleRef}
            descriptionRef={descriptionRef}
            authorRef={authorRef}
            servingsRef={servingsRef}
            prepTimeRef={prepTimeRef}
            cookTimeRef={cookTimeRef}
            errors={errors}
          />
          <RecipeComponents
            ingredients={ingredients}
            setIngredients={setIngredients}
            instructions={instructions}
            setInstructions={setInstructions}
            images={images}
            setImages={setImages}
            tags={tags}
            setTags={setTags}
          />
        </>
      )}
    </Container>
  );
};

export default RecipeEditor;
