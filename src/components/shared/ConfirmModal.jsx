import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../ui/Button";
import Modal from "./Modal";

const ConfirmModal = ({
  open,
  width,
  closeIcon,
  description,
  handleConfirm,
  handleCancel,
  ...props
}) => {
  // props & state values
  const headingStyles = {
    fontWeight: 700,
    fontSize: "30px",
    lineHeight: "120%",
    textAlign: "center",
  };

  const descriptionStyles = {
    marginTop: "14px",
    marginBottom: "24px",
  };

  const [loading, setLoading] = useState(false);

  // callbacks & functions
  useEffect(() => {
    // loading state cleanup
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Modal
      open={open}
      closeIcon={closeIcon}
      onClose={handleCancel}
      width={width ? width : "max-content"}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Typography sx={headingStyles}>Confirm</Typography>

        <Typography sx={descriptionStyles}>{description}</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Button
              variant="contained"
              color="secondary"
              className="secondary-button"
              disabled={loading}
              onClick={(event) => {
                event.stopPropagation();
                setLoading(true);
                handleCancel();
                setLoading(false);
              }}
              sx={{
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              className="success-button"
              disabled={loading}
              onClick={(event) => {
                event.stopPropagation();
                setLoading(true);
                handleConfirm();
                setLoading(false);
              }}
              sx={{
                textTransform: "none",
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
