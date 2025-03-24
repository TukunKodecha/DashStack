import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = ({ size = 30 }) => {
  return <CircularProgress size={size} color="primary" />;
};

export default Spinner;
