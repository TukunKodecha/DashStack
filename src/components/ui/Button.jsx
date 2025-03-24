import React from "react";
import { Button as MUIButton } from "@mui/material";

const Button = React.forwardRef(
  (
    {
      id,
      onClick,
      children,
      fullWidth,
      className,
      disabled,
      disableRipple,
      startIcon,
      endIcon,
      sx,
      type = "button",
      variant = "contained",
      color = "primary",
      size = "medium",
      disabledOpacity = 0.4,
      ...props
    },
    ref
  ) => {
    return (
      <MUIButton
        type={type}
        size={size}
        onClick={onClick}
        variant={variant}
        color={color}
        className={className}
        id={id}
        sx={{
          textTransform: "none",
          "&:disabled": {
            opacity: disabledOpacity,
          },
          ...sx,
        }}
        startIcon={startIcon}
        endIcon={endIcon}
        fullWidth={fullWidth ? true : false}
        disabled={disabled ? true : false}
        disableRipple={disableRipple ? true : false}
        ref={ref} // Forward the ref here
        {...props}
      >
        {children}
      </MUIButton>
    );
  }
);

export default Button;
