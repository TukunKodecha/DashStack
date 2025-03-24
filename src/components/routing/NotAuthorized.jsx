import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const NotAuthorized = () => {
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
        {t("Access denied")} !
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          lineHeight: "120%",
          color: "var(--dashstack-black)",
          marginBottom: "20px",
        }}
      >
        {t("You don't have access to this page")}
      </Typography>
      {userRole && (
        <Button
          variant="contained"
          className="primary-button"
          onClick={() => navigate("/dashboard")}
          sx={{ textTransform: "none" }}
        >
          {t("Go to Dashboard")}
        </Button>
      )}
    </Box>
  );
};

export default NotAuthorized;
