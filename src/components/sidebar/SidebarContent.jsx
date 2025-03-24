import React from "react";
import { Box, IconButton } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../shared/Logo";
import { setDrawerOpen } from "../../store/sidebarSlice";
import MenuIcon from "@mui/icons-material/Menu";

const SidebarContent = ({
  menuItems,
  showIconsOnly = false,
  isMobile = false,
}) => {
  // props & state values
  const dispatch = useDispatch();
  const { isMenuCollapsed, drawerOpen } = useSelector((state) => state.sidebar);

  // callbacks & functions
  const handleMenuIconClick = () => {
    dispatch(setDrawerOpen(!drawerOpen));
  };

  return (
    <Box
      sx={{
        width: isMobile
          ? drawerOpen
            ? "220px"
            : 0
          : isMenuCollapsed
          ? "60px"
          : "220px",
        minWidth: isMobile
          ? drawerOpen
            ? "220px"
            : 0
          : isMenuCollapsed
          ? "60px"
          : "220px",
        transition: "width 0.3s ease-in-out, min-width 0.3s ease-in-out",
        backgroundColor: "#fff",
        height: "100%",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #dcdcdc",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={{ marginBottom: "10px", marginTop: "10px", textAlign: "center" }}
        >
          <Logo showLogo={isMobile ? false : showIconsOnly ? true : false} />
        </Box>
        <SidebarMenu menuItems={menuItems} showIconsOnly={showIconsOnly} />

        {isMobile && (
          <IconButton
            disableRipple
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              padding: 0,
              backgroundColor: "transparent",
              height: "20px",
              width: "20px",
              "&:hover": { backgroundColor: "transparent" },
            }}
            onClick={handleMenuIconClick}
          >
            <MenuIcon color={"var(--dashstack-black)"} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default SidebarContent;
