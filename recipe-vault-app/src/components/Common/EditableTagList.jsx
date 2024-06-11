import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useState } from "react";

const EditableTagList = ({ tagsList }) => {
  const [tags, setTags] = useState(tagsList || []);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue) {
      setTags((prev) => [...prev, { title: inputValue }]);
      setInputValue("");
      event.preventDefault();
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={tags.map((tag) => tag.title)}
      value={tags}
      getOptionLabel={(option) => option.title || ""}
      onChange={(event, newValue) => {
        setTags(
          newValue.map((title) =>
            typeof title === "string" ? { title } : title
          )
        );
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onKeyDown={handleKeyDown}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.title}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          placeholder="Add New Tag"
        />
      )}
    />
  );
};

export default EditableTagList;
