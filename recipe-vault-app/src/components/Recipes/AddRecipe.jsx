import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import EditableTagList from "../Common/EditableTagList";
import { Ingredient } from "../Common/IngredientInput";

function AddRecipe() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState({ description: "" });
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [tags, setTags] = useState([]);
  const servingsRef = useRef();
  const prepTimeRef = useRef();
  const cookTimeRef = useRef();
  const authorRef = useRef();

  const addIngredient = (newIngredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const handleIngredientChange = (index, updatedIngredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? updatedIngredient : ingredient
      )
    );
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const addInstruction = () => {
    setInstructions((prevInstructions) => [
      ...prevInstructions,
      newInstruction,
    ]);
    setNewInstruction({ description: "" });
  };

  const handleNewInstructionChange = (e) => {
    const { name, value } = e.target;
    setNewInstruction({
      ...newInstruction,
      [name]: value,
    });
  };

  const handleInstructionChange = (index, e) => {
    const { name, value } = e.target;
    setInstructions((prevInstructions) =>
      prevInstructions.map((instruction, i) =>
        i === index ? { ...instruction, [name]: value } : instruction
      )
    );
  };

  const addImage = () => {
    setImages((prevImages) => [...prevImages, newImage]);
    setNewImage("");
  };

  const handleRemoveInstruction = (index) => {
    setInstructions((prevInstructions) =>
      prevInstructions.filter((_, i) => i !== index)
    );
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Recipe
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
      <Ingredient
        ingredient={{ name: "", quantity: "", unit: "", notes: "" }}
        isNew={true}
        addIngredient={addIngredient}
      />
      <br />
      {ingredients.map((ingredient, index) => (
        <React.Fragment key={index}>
          <Ingredient
            ingredient={ingredient}
            index={index}
            handleIngredientChange={handleIngredientChange()}
            handleRemoveIngredient={handleRemoveIngredient()}
          />
          <br />
        </React.Fragment>
      ))}

      <Typography variant="h6" component="h3" gutterBottom>
        Instructions
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            label="New Instruction"
            name="description"
            value={newInstruction.description}
            onChange={handleNewInstructionChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={addInstruction}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <List>
        {instructions.map((instruction, index) => (
          <ListItem key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <TextField
                  label="Instruction"
                  name="description"
                  value={instruction.description}
                  onChange={(e) => handleInstructionChange(index, e)}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => handleRemoveInstruction(index)}
                  edge="end"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" component="h3" gutterBottom>
        Images
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            label="New Image"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton variant="contained" color="primary" onClick={addImage}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <List>
        {images.map((image, index) => (
          <ListItem key={index}>
            {image}
            <IconButton onClick={() => handleRemoveImage(index)} edge="end">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <EditableTagList tagsList={tags} />
      <Button variant="contained" color="primary" style={{ marginTop: "16px" }}>
        Save Recipe
      </Button>
    </Container>
  );
}

export default AddRecipe;
