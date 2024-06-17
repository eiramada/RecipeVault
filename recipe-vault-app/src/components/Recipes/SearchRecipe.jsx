import { Box, Container, TextField } from "@mui/material";
import React, { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";

function SearchRecipe() {
  const { setSearchQuery } = useContext(RecipeContext);

  function handleSearchChange(event) {
    const searchValue = event.target.value.toLowerCase();
    setSearchQuery(searchValue);
  }

  return (
    <Container>
      <Box sx={{ my: 4, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          label="Search Recipes"
          variant="outlined"
          onChange={handleSearchChange}
        />
      </Box>
    </Container>
  );
}

export default SearchRecipe;
