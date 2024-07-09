import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
