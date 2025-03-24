import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  // props & state values
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { userRole } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          lineHeight: "120%",
          color: "var(--dashstack-black)",
          marginBottom: "8px",
          fontWeight: 600,
        }}
      >
        {t("Page not found")}
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          lineHeight: "120%",
          color: "var(--dashstack-black)",
          marginBottom: "20px",
        }}
      >
        {t("The page you are looking for does not exist")}
      </Typography>
      {userRole && (
        <Button
          variant="contained"
          className="primary-button"
          onClick={() => navigate("/dashboard")}
        >
          {t("Go to Dashboard")}
        </Button>
      )}
    </Box>
  );
};

export default NotFound;
