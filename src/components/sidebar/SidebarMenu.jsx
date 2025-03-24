import React from "react";
import { Box, List } from "@mui/material";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarMenu = ({ menuItems, showIconsOnly = false }) => {
  return (
    <List
      sx={{
        padding: 0,
        height: "100%",
        overflow: "auto",
      }}
    >
      {menuItems.map((item, index) => (
        <Box key={index}>
          <SidebarMenuItem
            text={item.text}
            icon={item.icon}
            route={item.route}
            selected={item.selected}
            showIconsOnly={showIconsOnly}
          />
        </Box>
      ))}
    </List>
  );
};

export default SidebarMenu;
