import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ImageList = ({ images, onImagesChange }) => {
  const { t } = useTranslation();
  const [newImage, setNewImage] = useState("");

  const handleAddImage = () => {
    if (newImage.trim()) {
      onImagesChange([...images, newImage]);
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            label={t("newImageUrlLabel")}
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleAddImage}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <List>
        {images.map((image, index) => (
          <ListItem key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <img
                  src={image}
                  alt={`${index}`}
                  style={{ width: 400, height: "auto" }}
                />
                <Typography variant="body2">{image}</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  edge="end"
                  aria-label={t("removeImageLabel")}
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

export default ImageList;
