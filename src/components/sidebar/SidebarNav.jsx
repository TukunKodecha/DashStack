import { useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
// import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import GridViewIcon from "@mui/icons-material/GridView";

import CustomDrawer from "./CustomDrawer";

import { useSelector } from "react-redux";
import SidebarContent from "./SidebarContent";
import { ADMIN, USER } from "../../utils/constant";

const SidebarNav = () => {
  // props & state values
  const { isMenuCollapsed, drawerOpen } = useSelector((state) => state.sidebar);

  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:600px)");

  const { userRole } = useSelector((state) => state.auth);

  const menuItems = [
    {
      route: "dashboard",
      text: "Dashboard",
      icon: <PieChartIcon />,
      selected: location.pathname === "/dashboard",
      roles: [ADMIN, USER],
    },
    {
      route: "products",
      text: "Products",
      icon: <GridViewIcon />,
      selected: location.pathname === "/products",
      roles: [ADMIN],
      lastItem: true,
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {isMobile ? (
        <CustomDrawer open={drawerOpen}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <SidebarContent
              menuItems={filteredMenuItems}
              isMenuCollapsed={isMenuCollapsed}
              isMobile
            />
          </Box>
        </CustomDrawer>
      ) : (
        <Box sx={{ display: "flex", height: "100%" }}>
          <SidebarContent
            menuItems={filteredMenuItems}
            isMenuCollapsed={isMenuCollapsed}
            showIconsOnly={isMenuCollapsed}
          />
        </Box>
      )}
    </>
  );
};

export default SidebarNav;
