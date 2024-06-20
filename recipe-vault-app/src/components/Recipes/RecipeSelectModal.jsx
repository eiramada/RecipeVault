import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const RecipeSelectModal = ({
  open,
  handleClose,
  recipes,
  selectedRecipe,
  setSelectedRecipe,
  handleSave,
}) => {
  const { t } = useTranslation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

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
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            {t("selectRecipeTitle")}
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="recipe-select-label">
              {t("selectRecipeInputLabel")}
            </InputLabel>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            {t("saveButtonLabel")}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RecipeSelectModal;
