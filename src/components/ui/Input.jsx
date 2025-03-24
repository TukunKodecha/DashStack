import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = React.forwardRef(
  (
    {
      type,
      placeholder,
      name,
      value,
      onChange,
      className,
      error,
      helperText,
      label,
      id,
      required,
      onBlur,
      onFocus,
      rows,
      sx,
      startAdornment,
      endAdornment,
      defualtValue,
      inputProps = null,
      fullWidth = false,
      readOnly = false,
      multiline = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    // props & state values
    const [showPassword, setShowPassword] = useState(false);

    // callbacks & functions
    const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: fullWidth ? "100%" : "auto",
        }}
      >
        {label && (
          <Typography
            sx={{
              fontSize: "16px",
              color: "var(--dashstack-black)",
              lineHeight: "120%",
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {label}
          </Typography>
        )}

        <TextField
          ref={ref}
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          className={className}
          variant="outlined"
          fullWidth={fullWidth}
          required={required}
          error={error}
          helperText={helperText}
          multiline={multiline}
          onBlur={onBlur}
          onFocus={onFocus}
          defaultValue={defualtValue}
          disabled={disabled}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {startAdornment || null}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {type === "password" ? (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ) : endAdornment ? (
                    endAdornment
                  ) : null}
                </InputAdornment>
              ),
              readOnly: readOnly,
              ...inputProps,
            },
          }}
          sx={{
            "& .MuiInputBase-input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px var(--dashstack-white) inset",
              WebkitPaddingAfter: "inherit",
              WebkitPaddingBefore: "inherit",
            },
            opacity: disabled ? 0.5 : 1,
            ...sx,
          }}
          {...props}
        />
      </Box>
    );
  }
);

export default Input;
