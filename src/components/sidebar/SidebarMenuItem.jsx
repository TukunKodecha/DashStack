import React from "react"; //   useState, //  useEffect,

// third-party imports
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen } from "../../store/sidebarSlice";
import { useTranslation } from "react-i18next";

const SidebarMenuItem = ({
  text,
  icon,
  route,
  selected = false,
  sx = {},
  showIconsOnly = false,
}) => {
  // props & state values
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { drawerOpen } = useSelector((state) => state.sidebar);

  const isMobile = useMediaQuery("(max-width:600px)");

  // callbacks & functions
  const handleListItemClick = (route) => {
    navigate(`/${route}`);

    if (isMobile) {
      dispatch(setDrawerOpen(!drawerOpen));
    }
  };

  return (
    <>
      <Tooltip title={showIconsOnly ? t(text) || "" : ""} placement="right">
        <ListItem
          onClick={() => handleListItemClick(route)}
          sx={{
            color: selected
              ? "var(--dashstack-white)"
              : "var(--dashstack-black)",
            background: selected
              ? "var(--dashstack-primary-blue)"
              : "transparent",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: selected
                ? "var(--dashstack-primary-blue)"
                : "var(--dashstack-light-blue)",
              color: "var(--dashstack-white)",
              "& .MuiListItemIcon-root": {
                color: "var(--dashstack-white)", // Change icon color on hover
              },
            },
            padding: showIconsOnly ? "4px" : "2px 10px 2px 5px",
            width: "auto",
            marginBottom: "10px",
            marginInline: "10px",
            cursor: "pointer",
            position: "relative",
            "&:first-of-type": {
              marginTop: "5px",
            },
            ...sx,
          }}
        >
          <Box display="flex" alignItems="center">
            <ListItemIcon
              sx={{
                color: selected
                  ? "var(--dashstack-white)"
                  : "var(--dashstack-black)",
                minWidth: "30px",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: selected
                  ? "var(--neuro-white-text)"
                  : "var(--neuro-bg-primary-seagreen)",
                borderRadius: "50%",
                padding: showIconsOnly ? 0 : "8px",
                marginRight: showIconsOnly ? 0 : "4px",
                "&>svg": {
                  width: "20px",
                  height: "20px",
                },
              }}
            >
              {icon}
            </ListItemIcon>

            {!showIconsOnly && (
              <ListItemText
                primary={t(text)}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "15px",
                  },
                }}
              />
            )}
          </Box>
        </ListItem>
      </Tooltip>
    </>
  );
};

export default SidebarMenuItem;
