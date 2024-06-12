import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useState } from "react";

const EditableTagList = ({ tagsList, setTags }) => {
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
      options={tagsList.map((tag) => tag.title)}
      value={tagsList}
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
        value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              variant="outlined"
              label={option.title}
              {...tagProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          placeholder="Add New Tag"
          margin="normal"
        />
      )}
    />
  );
};

export default EditableTagList;
