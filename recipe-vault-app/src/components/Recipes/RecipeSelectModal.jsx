import {
    Backdrop,
    Button,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
} from "@mui/material";
import React from "react";

const RecipeSelectModal = ({
  open,
  handleClose,
  recipes,
  selectedRecipe,
  setSelectedRecipe,
  handleSave,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            outline: "none",
            borderRadius: "8px",
          }}
        >
          <h2>Select Recipe</h2>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel id="recipe-select-label">Select Recipe</InputLabel>
            <Select
              labelId="recipe-select-label"
              value={selectedRecipe}
              onChange={(e) => setSelectedRecipe(e.target.value)}
            >
              {recipes.map((recipe) => (
                <MenuItem key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default RecipeSelectModal;
