import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CustomPagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      {/* ✅ Showing X-Y of Z */}
      <Typography variant="body2" color="textSecondary">
        Showing {start}-{end} of {totalItems}
      </Typography>

      {/* ✅ Pagination Controls */}
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={handlePrev}
          disabled={currentPage === 1}
          disableRipple
          sx={{
            border: "1px solid var(--dashstack-secondary_border)",
            width: "40px",
            height: "30px",
            borderRadius: 0,
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
            "&:hover": { backgroundColor: "transparent" },
            "& >svg": {
              opacity: currentPage === 1 ? 0.5 : 1,
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          disableRipple
          onClick={handleNext}
          disabled={currentPage === totalPages}
          sx={{
            border: "1px solid var(--dashstack-secondary_border)",
            borderLeft: "none",
            width: "40px",
            height: "30px",
            borderRadius: 0,
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            "&:hover": { backgroundColor: "transparent" },
            "& >svg": {
              opacity: currentPage === totalPages ? 0.5 : 1,
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomPagination;
