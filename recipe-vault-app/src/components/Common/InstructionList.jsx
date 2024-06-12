import React, { useState } from "react";
import { Grid, IconButton, List, ListItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const InstructionList = ({ instructions = [], onInstructionsChange }) => {
  const [newInstruction, setNewInstruction] = useState({ description: "" });

  const handleAddInstruction = () => {
    if (newInstruction.description.trim()) {
      onInstructionsChange([...instructions, newInstruction]);
      setNewInstruction({ description: "" });
    }
  };

  const handleInstructionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInstructions = instructions.map((instruction, i) =>
      i === index ? { ...instruction, [name]: value } : instruction
    );
    onInstructionsChange(updatedInstructions);
  };

  const handleRemoveInstruction = (index) => {
    onInstructionsChange(instructions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            label="New Instruction"
            name="description"
            value={newInstruction.description}
            onChange={(e) =>
              setNewInstruction({
                ...newInstruction,
                description: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            multiline
            rows={2}
            helperText="Enter the details of the step here."
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleAddInstruction}
              aria-label="add instruction"
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
                  label={`Step ${index + 1}`}
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
    </div>
  );
};

export default InstructionList;
