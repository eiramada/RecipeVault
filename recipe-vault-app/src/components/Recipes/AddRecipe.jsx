import {
  Autocomplete,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

function AddRecipe() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newInstruction, setNewInstruction] = useState("");
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const servingsRef = useRef();
  const prepTimeRef = useRef();
  const cookTimeRef = useRef();
  const authorRef = useRef();

  const addIngredient = () => {
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient("");
  };

  const addInstruction = () => {
    setInstructions([...instructions, newInstruction]);
    setNewInstruction("");
  };

  const addImage = () => {
    setImages([...images, newImage]);
    setNewImage("");
  };

  const addTag = () => {
    setTags([...tags, newTag]);
    setNewTag("");
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
        label="New Ingredient"
        value={newIngredient}
        onChange={(e) => setNewIngredient(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addIngredient}>
        Add Ingredient
      </Button>
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
        ))}
      </List>
      <TextField
        label="New Instruction"
        value={newInstruction}
        onChange={(e) => setNewInstruction(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addInstruction}>
        Add Instruction
      </Button>
      <List>
        {instructions.map((instruction, index) => (
          <ListItem key={index}>{instruction}</ListItem>
        ))}
      </List>
      <TextField
        label="New Image"
        value={newImage}
        onChange={(e) => setNewImage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addImage}>
        Add Image
      </Button>
      <List>
        {images.map((image, index) => (
          <ListItem key={index}>{image}</ListItem>
        ))}
      </List>
      <TextField
        label="New Tag"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addTag}>
        Add Tag
      </Button>
      <List>
        {tags.map((tag, index) => (
          <ListItem key={index}>{tag}</ListItem>
        ))}
      </List>

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
    </Container>
  );
}

export default AddRecipe;
