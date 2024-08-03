import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ImageList = ({ images, onImagesChange }) => {
  const { t } = useTranslation();
  const [newImage, setNewImage] = useState("");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleAddImage = () => {
    if (newImage.trim()) {
      onImagesChange([...images, newImage]);
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const filteredImages = images.filter((image) => image !== "Placeholder.webp");

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={isMobile ? 10 : 11.5}>
          <TextField
            label={t("image.newUrlTitle")}
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={isMobile ? 2 : 0.5}>
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
        {filteredImages.map((image, index) => (
          <ListItem key={index} sx={{ p: 0, m: 0 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={isMobile ? 12 : 11.5}>
                <img
                  src={image}
                  alt={`${index}`}
                  style={{
                    width: isMobile ? "100%" : 400,
                    height: "auto",
                    maxWidth: "100%",
                  }}
                />
                <Typography variant="body2" style={{ wordWrap: "break-word" }}>
                  {image}
                </Typography>
              </Grid>
              <Grid item xs={isMobile ? 12 : 0.5}>
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  edge="end"
                  aria-label={t("image.removeTitle")}
                  sx={{ marginTop: isMobile ? 1 : 0 }}
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
