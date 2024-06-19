import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RecipeContext } from "../../contexts/RecipeContext";

function SearchRecipe() {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = useContext(RecipeContext);
  const [searchValue, setSearchValue] = useState(searchQuery);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  function handleSearchChange(event) {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    setSearchQuery(value);
  }

  function handleClearSearch() {
    setSearchValue("");
    setSearchQuery("");
  }

  return (
    <Container>
      <Box sx={{ my: 4, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          label={t("searchRecipes")}
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t("clearSearch")}
                  onClick={handleClearSearch}
                  edge="end"
                  size="large"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
}

export default SearchRecipe;
