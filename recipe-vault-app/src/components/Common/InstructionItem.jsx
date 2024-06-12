import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";

const InstructionItem = ({
  instruction,
  index,
  onChange,
  onRemove,
  provided,
}) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Grid item xs={1}>
        <DragIndicatorIcon />
      </Grid>
      <Grid item xs={9}>
        <TextField
          label={`Step ${index + 1}`}
          name="description"
          value={instruction.description}
          onChange={(e) => onChange(index, e)}
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={() => onRemove(index)} edge="end">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default InstructionItem;
