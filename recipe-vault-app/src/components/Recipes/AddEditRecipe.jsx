import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import recipesFromFile from "../../data/recipes.json";
import EditableTagList from "../Common/EditableTagList";
import ImageList from "../Common/ImageList";
import IngredientList from "../Common/IngredientList";
import InstructionList from "../Common/InstructionList";

function AddEditRecipe({ isEditMode = false }) {
  const { id } = useParams();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [recipes, setRecipes] = useState(recipesFromFile);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const servingsRef = useRef();
  const prepTimeRef = useRef();
  const cookTimeRef = useRef();
  const authorRef = useRef();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    const recipesFromLocal = storedRecipes ? JSON.parse(storedRecipes) : [];
    if (Array.isArray(recipesFromLocal)) {
      setRecipes((prevRecipes) => [...prevRecipes, ...recipesFromLocal]);
    }
  }, []);

  const [existingRecipe, setExistingRecipe] = useState(null);

  useEffect(() => {
    const recipe = recipes.find((r) => r.id === id);
    setExistingRecipe(recipe);
  }, [recipes, id]);

  useEffect(() => {
    if (isEditMode && existingRecipe) {
      titleRef.current.value = existingRecipe.title;
      descriptionRef.current.value = existingRecipe.description;
      servingsRef.current.value = existingRecipe.servings;
      prepTimeRef.current.value = existingRecipe.prepTime;
      cookTimeRef.current.value = existingRecipe.cookTime;
      authorRef.current.value = existingRecipe.author;
      setIngredients(existingRecipe.ingredients || []);
      setInstructions(existingRecipe.instructions || []);
      setImages(existingRecipe.images || []);
      setTags(existingRecipe.tags || []);
    }
  }, [isEditMode, existingRecipe]);

  const handleInstructionsChange = (updatedInstructions) => {
    setInstructions(updatedInstructions);
  };

  const handleImagesChange = (updatedImages) => {
    setImages(updatedImages);
  };

  const handleIngredientsChange = (updatedIngredients) => {
    setIngredients(updatedIngredients);
  };

  const saveRecipe = () => {
    if (!isValidated()) return;

    const storedRecipes = localStorage.getItem("recipes");
    const recipesFromLocal = storedRecipes ? JSON.parse(storedRecipes) : [];
    let newId;
    let updatedRecipes;

    if (isEditMode) {
      newId = existingRecipe.id;
      updatedRecipes = recipesFromLocal.map((recipe) =>
        recipe.id === newId
          ? {
              ...recipe,
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
            }
          : recipe
      );
    } else {
      newId = recipes.length ? Number(recipes[recipes.length - 1].id) + 1 : 1;

      const newRecipe = {
        id: newId.toString(),
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

      updatedRecipes = [...recipesFromLocal, newRecipe];
    }

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
    setMessage("Success!");
  };

  const isValidated = () => {
    // Add validation logic
    return true;
  };

  return (
    <Container>
      {message && (
        <div>
          {message} <button onClick={() => setMessage("")}>X</button>
        </div>
      )}
      <Typography variant="h4" component="h2" gutterBottom>
        {isEditMode ? "Edit Recipe" : "Add New Recipe"}
      </Typography>
      <TextField label="Title" inputRef={titleRef} fullWidth margin="normal" />
      <TextField
        label="Description"
        inputRef={descriptionRef}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Servings"
        type="number"
        inputRef={servingsRef}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Prep Time (mins)"
        type="number"
        inputRef={prepTimeRef}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cook Time (mins)"
        type="number"
        inputRef={cookTimeRef}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        inputRef={authorRef}
        fullWidth
        margin="normal"
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
}

export default AddEditRecipe;
