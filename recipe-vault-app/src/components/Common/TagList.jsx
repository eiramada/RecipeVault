import { Chip, Stack, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";

const TagList = ({ tags, onTagClick, maxTags }) => {
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

  const displayedTags = maxTags ? tags.slice(0, maxTags) : tags;

  return (
    <Stack
      direction="row"
      textAlign="center"
      spacing={1}
      sx={{
        flexWrap: "nowrap",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center",
        },
        [theme.breakpoints.up("md")]: {
          justifyContent: "flex-start",
        },
      }}
    >
      {displayedTags &&
        displayedTags.map((tag, index) => (
          <Chip
            label={tag}
            key={index}
            variant="outlined"
            onClick={(event) => handleTagClick(event, tag)}
            sx={{
              height: 24,
              fontSize: 12,
              padding: "0 6px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          />
        ))}
    </Stack>
  );
};

export default TagList;
