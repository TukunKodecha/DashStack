import { Box, useMediaQuery } from "@mui/material";
import Header from "./Header";
import SidebarNav from "../sidebar/SidebarNav";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { isMenuCollapsed } = useSelector((state) => state.sidebar);

  const isMobile = useMediaQuery("(max-width:600px)");

  const sidebarWidth = isMobile ? "0px" : isMenuCollapsed ? "60px" : "220px";

  return (
    <Box sx={{ display: "flex", height: "100vh", boxSizing: "border-box" }}>
      {/* Sidebar */}
      <Box sx={{ height: "100%" }}>
        <SidebarNav />
      </Box>

      {/* Header and Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${sidebarWidth})`,
          transition: "width 0.3s ease-in-out",
        }}
      >
        <Header />
        <Box
          sx={{
            height: "calc(100% - 60px)",
            overflowY: "auto",
          }}
        >
          <Outlet />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
