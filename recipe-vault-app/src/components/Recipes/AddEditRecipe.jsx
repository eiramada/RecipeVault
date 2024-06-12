import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EditableTagList from "../Common/EditableTagList";
import ImageList from "../Common/ImageList";
import IngredientList from "../Common/IngredientList";
import InstructionList from "../Common/InstructionList";

const recipesUrl = process.env.REACT_APP_RECIPES_DB_URL;

function AddEditRecipe({ isEditMode = false }) {
  const { id } = useParams();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const servingsRef = useRef();
  const prepTimeRef = useRef();
  const cookTimeRef = useRef();
  const authorRef = useRef();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(recipesUrl)
      .then((result) => result.json())
      .then((json) => {
        setRecipes(json || []);
        console.log(json);
      });
  }, []);

  const [existingRecipe, setExistingRecipe] = useState(null);

  useEffect(() => {
    const recipe = recipes.find((r) => Number(r.id) === Number(id));
    console.log("recipe", recipe);
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

    let newId = isEditMode ? existingRecipe.id : recipes.length ? Number(recipes[recipes.length - 1].id) + 1 : 1;

    const updatedRecipe = {
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

    if (isEditMode) {
      const index = recipes.indexOf(existingRecipe);
      recipes[index] = updatedRecipe;
   
      fetch(recipesUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipes),
      })
        .then(setMessage("Recipe added successfully!"))

        .catch((error) => {
          console.error("Error updating recipe:", error);
          setMessage("Error updating recipe.");
        });
    } else {
      recipes.push(updatedRecipe);
      fetch(recipesUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipes),
      })
        .then(setMessage("Recipe added successfully!"))
        .catch((error) => {
          console.error("Error adding recipe:", error);
          setMessage("Error adding recipe.");
        });
    }
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
