import { Box, Container, TextField, Button } from "@mui/material";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function SearchRecipe() {
  const searchRef = useRef();
  const navigate = useNavigate();

  function search() {
    const searchValue = searchRef.current?.value?.toLowerCase() || "";
    navigate(`/recipes?search=${searchValue}`);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      search();
    }
  }

  return (
    <Container>
      <Box sx={{ my: 4, display: 'flex', alignItems: 'center' }}>
        <TextField
          inputRef={searchRef}
          fullWidth
          label="Search Recipes"
          variant="outlined"
          onKeyDown={handleKeyDown}
        />
        <Button 
          onClick={search} 
          variant="contained" 
          sx={{ ml: 2 }}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
}

export default SearchRecipe;
