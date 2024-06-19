import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Grid, IconButton, List, ListItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

const Instructions = ({ instructions, onInstructionsChange }) => {
  const { t } = useTranslation();

  const [newInstruction, setNewInstruction] = useState({ description: "" });

  const handleAddInstruction = () => {
    if (newInstruction.description.trim()) {
      onInstructionsChange([
        ...instructions,
        {
          description: newInstruction.description,
          step: instructions.length + 1,
        },
      ]);
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
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    onInstructionsChange(
      updatedInstructions.map((instruction, i) => ({
        ...instruction,
        step: i + 1,
      }))
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedInstructions = Array.from(instructions);
    const [movedItem] = updatedInstructions.splice(result.source.index, 1);
    updatedInstructions.splice(result.destination.index, 0, movedItem);

    onInstructionsChange(
      updatedInstructions.map((instruction, i) => ({
        ...instruction,
        step: i + 1,
      }))
    );
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            label={t("newInstructionLabel")}
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
            helperText={t("enterDetailsHere")}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleAddInstruction}
            aria-label={t("addInstruction")}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <Droppable droppableId="instructions">
          {(provided) => ( */}
            <List
            //  {...provided.droppableProps} ref={provided.innerRef}
             >
              {instructions.map((instruction, index) => (
                // <Draggable
                //   key={instruction.step}
                //   draggableId={instruction.step.toString()}
                //   index={index}
                // >
                //   {(provided) => (
                <ListItem
                  // ref={provided.innerRef}
                  // {...provided.draggableProps}
                  // {...provided.dragHandleProps}
                >
                  <Grid container spacing={2} alignItems="center">
                    {/* <Grid item xs={1}>
                      <DragIndicatorIcon />
                    </Grid> */}
                    <Grid item xs={9}>
                      <TextField
                        label={`${t("stepLabel")} ${instruction.step}`}
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
                        aria-label={t("deleteInstruction")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
                //     )}
                //   </Draggable>
              ))}
              {/* {provided.placeholder} */}
            </List>
          {/* )}
        </Droppable> */}
      </DragDropContext>
    </>
  );
};

export default Instructions;
