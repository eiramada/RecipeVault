import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EditableTagList from "../Common/EditableTagList";
import ImageList from "../Common/ImageList";
import IngredientList from "../Common/IngredientList";
import InstructionList from "../Common/InstructionList";

const recipesUrl = process.env.REACT_APP_RECIPES_DB_URL;

const AddEditRecipe = ({ isEditMode = false }) => {
  const { id } = useParams();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const servingsRef = useRef();
  const prepTimeRef = useRef();
  const cookTimeRef = useRef();
  const authorRef = useRef();

  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const [existingRecipe, setExistingRecipe] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length) {
      findExistingRecipe();
    }
  }, [recipes, id]);

  useEffect(() => {
    if (isEditMode && existingRecipe) {
      populateFormWithExistingRecipe();
    }
  }, [isEditMode, existingRecipe]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(recipesUrl);
      const data = await response.json();
      setRecipes(data || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const findExistingRecipe = () => {
    const recipe = recipes.find((r) => Number(r.id) === Number(id));
    setExistingRecipe(recipe);
  };

  const populateFormWithExistingRecipe = () => {
    if (existingRecipe) {
      titleRef.current.value = existingRecipe.title || "";
      descriptionRef.current.value = existingRecipe.description || "";
      servingsRef.current.value = existingRecipe.servings || "";
      prepTimeRef.current.value = existingRecipe.prepTime || "";
      cookTimeRef.current.value = existingRecipe.cookTime || "";
      authorRef.current.value = existingRecipe.author || "";
      setIngredients(existingRecipe.ingredients || []);
      setInstructions(existingRecipe.instructions || []);
      setImages(existingRecipe.images || []);
      setTags(existingRecipe.tags || []);
    }
  };

  const handleInstructionsChange = (updatedInstructions) => {
    setInstructions(updatedInstructions);
  };

  const handleImagesChange = (updatedImages) => {
    setImages(updatedImages);
  };

  const handleIngredientsChange = (updatedIngredients) => {
    setIngredients(updatedIngredients);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!titleRef.current.value) newErrors.title = "Title is required";
    if (!descriptionRef.current.value)
      newErrors.description = "Description is required";
    if (
      !servingsRef.current.value ||
      isNaN(servingsRef.current.value) ||
      servingsRef.current.value <= 0
    )
      newErrors.servings = "Servings must be a positive number";
    if (
      !prepTimeRef.current.value ||
      isNaN(prepTimeRef.current.value) ||
      prepTimeRef.current.value <= 0
    )
      newErrors.prepTime = "Prep Time must be a positive number";
    if (
      !cookTimeRef.current.value ||
      isNaN(cookTimeRef.current.value) ||
      cookTimeRef.current.value <= 0
    )
      newErrors.cookTime = "Cook Time must be a positive number";
    if (!authorRef.current.value) newErrors.author = "Author is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveRecipe = async () => {
    if (!validateFields()) return;

    const newId = isEditMode ? existingRecipe.id : generateNewId();

    const updatedRecipe = createUpdatedRecipe(newId);

    try {
      if (isEditMode) {
        await updateRecipe(updatedRecipe);
      } else {
        await addNewRecipe(updatedRecipe);
      }
      setMessage("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      setMessage("Error saving recipe.");
    }
  };

  const generateNewId = () => {
    return recipes.length ? Number(recipes[recipes.length - 1].id) + 1 : 1;
  };

  const createUpdatedRecipe = (newId) => {
    return {
      id: newId,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      servings: Number(servingsRef.current.value),
      prepTime: Number(prepTimeRef.current.value),
      cookTime: Number(cookTimeRef.current.value),
      author: authorRef.current.value,
      ingredients,
      instructions,
      images,
      tags,
    };
  };

  const updateRecipe = async (updatedRecipe) => {
    const index = recipes.indexOf(existingRecipe);
    recipes[index] = updatedRecipe;
    await fetch(recipesUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipes),
    });
  };

  const addNewRecipe = async (updatedRecipe) => {
    recipes.push(updatedRecipe);
    await fetch(recipesUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipes),
    });
  };

  return (
    <Container>
      {message && (
        <Alert
          severity={message.includes("Error") ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setMessage("")}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Typography variant="h4" component="h2" gutterBottom>
        {isEditMode ? "Edit Recipe" : "Add New Recipe"}
      </Typography>

      <TextField
        label="Title"
        inputRef={titleRef}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Description"
        inputRef={descriptionRef}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        label="Servings"
        type="number"
        inputRef={servingsRef}
        fullWidth
        margin="normal"
        error={!!errors.servings}
        helperText={errors.servings}
      />
      <TextField
        label="Prep Time (mins)"
        type="number"
        inputRef={prepTimeRef}
        fullWidth
        margin="normal"
        error={!!errors.prepTime}
        helperText={errors.prepTime}
      />
      <TextField
        label="Cook Time (mins)"
        type="number"
        inputRef={cookTimeRef}
        fullWidth
        margin="normal"
        error={!!errors.cookTime}
        helperText={errors.cookTime}
      />
      <TextField
        label="Author"
        inputRef={authorRef}
        fullWidth
        margin="normal"
        error={!!errors.author}
        helperText={errors.author}
      />

      <Typography variant="h6" component="h3" gutterBottom>
        Ingredients
      </Typography>
      <IngredientList
        ingredients={ingredients}
        onIngredientsChange={handleIngredientsChange}
      />

      <Typography variant="h6" component="h3" gutterBottom>
        Instructions
      </Typography>
      <InstructionList
        instructions={instructions}
        onInstructionsChange={handleInstructionsChange}
      />

      <Typography variant="h6" component="h3" gutterBottom>
        Images
      </Typography>
      <ImageList images={images} onImagesChange={handleImagesChange} />

      <EditableTagList tagsList={tags} setTags={setTags} />

      <Button
        onClick={saveRecipe}
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Save Recipe
      </Button>
    </Container>
  );
};

export default AddEditRecipe;
