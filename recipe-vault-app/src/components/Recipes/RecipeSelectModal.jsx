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
          <h2>{t("selectRecipeTitle")}</h2>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
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
          <Button variant="contained" color="primary" onClick={handleSave}>
            {t("saveButtonLabel")}
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default RecipeSelectModal;
