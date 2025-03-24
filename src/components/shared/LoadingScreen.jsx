import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingScreen = ({ sx }) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
