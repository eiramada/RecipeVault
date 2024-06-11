import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import recipesFromFile from "../../data/recipes.json";

function EditRecipe() {
  const { id } = useParams();
  const recipe = recipesFromFile.find((r) => r.id === id);

  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = editedRecipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [name]: value };
      }
      return ingredient;
    });
    setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, e) => {
    const { name, value } = e.target;
    const newInstructions = editedRecipe.instructions.map((instruction, i) => {
      if (i === index) {
        return { ...instruction, [name]: value };
      }
      return instruction;
    });
    setEditedRecipe({ ...editedRecipe, instructions: newInstructions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited recipe saved:", editedRecipe);
  };

  if (!editedRecipe) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h2" gutterBottom>
          Edit Recipe
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={editedRecipe.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={editedRecipe.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Typography variant="h6" component="h3" gutterBottom>
          Ingredients
        </Typography>
        {editedRecipe.ingredients.map((ingredient, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={3}>
              <TextField
                label="Name"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Quantity"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Unit"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Notes"
                name="notes"
                value={ingredient.notes}
                onChange={(e) => handleIngredientChange(index, e)}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        <Typography variant="h6" component="h3" gutterBottom>
          Instructions
        </Typography>
        {editedRecipe.instructions.map((instruction, index) => (
          <TextField
            key={index}
            label="Instruction"
            name="description"
            value={instruction.description}
            onChange={(e) => handleInstructionChange(index, e)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        ))}
        <Button type="submit" variant="contained" color="primary">
          Save Recipe
        </Button>
      </form>
    </Container>
  );
}

export default EditRecipe;
