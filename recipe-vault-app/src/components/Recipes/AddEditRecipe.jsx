import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";
import RecipeForm from "./RecipeForm";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import EditableTagList from "../Common/EditableTagList";
import ImageList from "../Common/ImageList";

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
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const [existingRecipe, setExistingRecipe] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { recipes, addNewRecipe, updateExistingRecipe } =
    useContext(RecipeContext);

  const findExistingRecipe = useCallback(() => {
    const recipe = recipes.find((r) => Number(r.id) === Number(id));
    setExistingRecipe(recipe);
  }, [recipes, id]);

  const populateFormWithExistingRecipe = useCallback(() => {
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
  }, [existingRecipe]);

  useEffect(() => {
    if (recipes.length && isEditMode) {
      findExistingRecipe();
    }
  }, [recipes, id, isEditMode, findExistingRecipe]);

  useEffect(() => {
    if (isEditMode && existingRecipe) {
      populateFormWithExistingRecipe();
    }
  }, [isEditMode, existingRecipe, populateFormWithExistingRecipe]);

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

    setLoading(true);
    const newId = isEditMode ? existingRecipe.id : generateNewId();
    const updatedRecipe = createUpdatedRecipe(newId);

    try {
      if (isEditMode) {
        await updateExistingRecipe(updatedRecipe);
      } else {
        await addNewRecipe(updatedRecipe);
      }
      setMessage("Recipe saved successfully!");
      navigate(`/recipe/${newId}`);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setMessage("Error saving recipe.");
    } finally {
      setLoading(false);
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
      totalTime:
        Number(prepTimeRef.current.value) + Number(cookTimeRef.current.value),
      author: authorRef.current.value,
      createdAt: isEditMode ? existingRecipe.createdAt : new Date(),
      updatedAt: new Date(),
      ingredients,
      instructions,
      images,
      tags,
    };
  };

  return (
    <Container>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
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
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h4" component="h2" gutterBottom>
              {isEditMode ? "Edit Recipe" : "Add New Recipe"}
            </Typography>
            <Button
              onClick={saveRecipe}
              variant="contained"
              color="primary"
              style={{
                marginLeft: "16px",
              }}
            >
              Save Recipe
            </Button>
            {existingRecipe && (
              <Link to={`/recipe/${existingRecipe.id}`}>
                <Button size="small" color="primary">
                  Back
                </Button>
              </Link>
            )}
          </Box>

          <RecipeForm
            titleRef={titleRef}
            descriptionRef={descriptionRef}
            authorRef={authorRef}
            servingsRef={servingsRef}
            prepTimeRef={prepTimeRef}
            cookTimeRef={cookTimeRef}
            errors={errors}
          />

          <RecipeIngredients
            ingredients={ingredients}
            onIngredientsChange={handleIngredientsChange}
          />

          <RecipeInstructions
            instructions={instructions}
            onInstructionsChange={handleInstructionsChange}
          />

          <EditableTagList tagsList={tags} setTags={setTags} />

          <Typography variant="h6" component="h3" gutterBottom>
            Images
          </Typography>
          <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
            <ImageList images={images} onImagesChange={handleImagesChange} />
          </Paper>
        </>
      )}
    </Container>
  );
};

export default AddEditRecipe;
