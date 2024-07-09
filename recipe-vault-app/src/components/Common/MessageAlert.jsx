import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton } from "@mui/material";
import React from "react";

const MessageAlert = ({ message, setMessage }) => (
  <Alert
    severity={message.includes("Error") ? "error" : "success"}
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => setMessage("")}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
    sx={{ mb: 2 }}
  >
    {message}
  </Alert>
);

export default MessageAlert;
