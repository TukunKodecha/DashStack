import React from "react";
import {
  Box,
  IconButton,
  Modal as MuiModal,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({
  open,
  onClose,
  children,
  width,
  height,
  closeIcon = false,
  ...props
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClose = (event, reason) => {
    // Prevent closing on backdrop click or escape key
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }

    if (onClose) {
      // If onClose expects no arguments
      if (onClose.length === 0) {
        onClose();
      } else {
        // If onClose expects event and reason
        onClose(event, reason);
      }
    }
  };
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--dashstack-white)",
          width: width ? (isMobile ? "94%" : width) : "600px",
          minHeight: "200px",
          height: height || "max-content",
          display: "flex",
          paddingBlock: "20px",
          paddingInline: isMobile ? 0 : "20px",
          justifyContent: "center",
          borderRadius: "20px",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60px", // Thickness of the right border
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(98, 181, 90, 1), rgba(37, 129, 196, 1))",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",

            "@media (max-width: 600px)": {
              width: "100%",
              height: "60px", // Thickness of the top border
              background:
                "linear-gradient(to right, rgba(98, 181, 90, 1), rgba(37, 129, 196, 1))",
              borderTopRightRadius: "20px",
              borderTopLeftRadius: "20px",
              borderBottomRightRadius: 0,
              right: "auto",
              top: 0,
              left: 0,
            },
          }}
        />

        <>
          {closeIcon && (
            <IconButton
              onClick={() => onClose && onClose()}
              size="small"
              sx={{
                position: "absolute",
                top: isMobile ? "15px" : "20px",
                right: isMobile ? "15px" : "38px",
              }}
            >
              <CloseIcon
                sx={{
                  color: "var(--dashstack-white)",
                  width: "24px",
                  height: "24px",
                }}
              />
            </IconButton>
          )}
          <Box
            sx={{
              width: "100%",
              marginRight: "60px",
              "@media (max-width: 600px)": {
                marginRight: 0,
                marginTop: "60px",
              },
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </Box>
        </>
      </Box>
    </MuiModal>
  );
};

export default Modal;
