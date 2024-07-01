import { Chip, Stack, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";

const TagList = ({ tags, onTagClick }) => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(RecipeContext);
  const theme = useTheme();

  const handleTagClick = (event, tag) => {
    event.preventDefault();
    if (onTagClick) {
      onTagClick(event, tag);
    } else {
      setSearchQuery(tag);
      navigate(`/recipes`);
    }
  };

  return (
    <Stack
      direction="row"
      textAlign='center' 
      spacing={1}
      sx={{
        flexWrap: "wrap",
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center",
        },
        [theme.breakpoints.up("md")]: {
          justifyContent: "flex-start",
        },
      }}
    >
      {tags &&
        tags.map((tag, index) => (
          <Chip
            label={tag}
            key={index}
            variant="outlined"
            onClick={(event) => handleTagClick(event, tag)}
            className={index === 0 ? "chip-no-left-margin" : "chip-margin"}
          />
        ))}
    </Stack>
  );
};

export default TagList;
