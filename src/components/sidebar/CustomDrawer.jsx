import { Box } from "@mui/material";

const CustomDrawer = ({ open, children }) => {
  return (
    <>
      {open && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            height: "100%",
            zIndex: 100,
            transition: "transform 0.3s ease-in-out",
            overflow: "hidden",
            top: 0,
            borderTop: "1px solid var(--neuro-secondary_border)",
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
};

export default CustomDrawer;
