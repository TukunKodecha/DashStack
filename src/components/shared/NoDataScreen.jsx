import React from "react";
import { Box, Typography } from "@mui/material";

const NoDataScreen = ({ text, sx }) => {
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
      <Typography className="no-data">{text || "No data found"}</Typography>
    </Box>
  );
};

export default NoDataScreen;
