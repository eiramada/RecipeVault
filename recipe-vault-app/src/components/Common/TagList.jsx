import { Chip, Stack } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";

const TagList = ({ tags, onTagClick }) => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(RecipeContext);

  const handleTagClick = (event, tag) => {
    if (onTagClick) {
      onTagClick(event, tag);
    } else {
      setSearchQuery(tag)
      navigate(`/recipes`);
    }
  };

  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      {tags && tags.map((tag, index) => (
        <Chip
          label={tag}
          key={index}
          variant="outlined"
          onClick={(event) => handleTagClick(event, tag)}
          sx={{ marginBottom: "4px" }}
        />
      ))}
    </Stack>
  );
};

export default TagList;
