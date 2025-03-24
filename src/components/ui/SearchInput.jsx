import React from "react";

// third-party imports
import { InputAdornment, TextField } from "@mui/material";

const SearchInput = ({
  value,
  placeholder,
  onChange,
  endIcon,
  startIcon,
  fullWidth,
  width,
  sx,
  backgroundColor = "var(--dashstack-primary-bg)",
}) => {
  return (
    <TextField
      placeholder={placeholder}
      fullWidth={fullWidth ? true : false}
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              {startIcon || null}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{endIcon || null}</InputAdornment>
          ),
        },
      }}
      sx={{
        height: "36px",
        width: width ? width : fullWidth ? "100%" : "200px",
        borderRadius: "50px",
        "& .MuiInputBase-root": {
          paddingRight: "12px",
          paddingLeft: "12px",
          borderRadius: "50px",
          height: "36px",
          border: "1px solid var(--dashstack-secondary_border)",
        },
        "& .MuiInputBase-input": {
          padding: "0px !important",
          height: "36px !important",
        },
        "& .MuiInputAdornment-positionStart": {
          color: "var(--dashstack-black)",
          display: startIcon ? "flex" : "none",
        },
        "& .MuiInputAdornment-positionEnd": {
          color: "var(--dashstack-black)",
          display: endIcon ? "flex" : "none",
        },
        "& .MuiOutlinedInput-root": {
          backgroundColor: backgroundColor,
          "& fieldset": {
            borderColor: "transparent", // default
          },
          "&:hover fieldset": {
            borderColor: "transparent", // hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent", // focus
          },
        },
        ...sx,
      }}
    />
  );
};

export default SearchInput;
