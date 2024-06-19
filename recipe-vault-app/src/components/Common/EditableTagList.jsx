import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const EditableTagList = ({ tagsList, setTags }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue) {
      setTags((prev) => [...prev, inputValue]);
      setInputValue("");
      event.preventDefault();
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={tagsList.map((tag) => tag)}
      value={tagsList}
      getOptionLabel={(option) => option || ""}
      onChange={(event, newValue) => {
        setTags(newValue);
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
            <Chip key={index} variant="outlined" label={option} {...tagProps} />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={t("tagsInputLabel")}
          placeholder={t("tags.inputPlaceholder")}
          margin="normal"
        />
      )}
    />
  );
};

export default EditableTagList;
