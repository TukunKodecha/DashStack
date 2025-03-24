import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const DashbaordCard = (props) => {
  // props & state values
  const { data } = props;
  const {
    backgroundColor,
    color,
    count,
    growthCount,
    growthCountText,
    primaryText,
    Icon,
    isGrowth = true,
  } = data;

  return (
    <Box
      sx={{
        backgroundColor: "var(--dashstack-white)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        padding: "12px",
        border: "1px solid transparent",
        "&:hover": {
          border: "1px solid var(--dashstack-secondary_border)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Typography>{primaryText}</Typography>
          <Typography sx={{ fontSize: "22px", fontWeight: 700 }}>
            {count}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColor,
            color: color,
            "& >svg": {
              fontSize: "30px",
            },
          }}
        >
          {<Icon />}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isGrowth ? (
          <TrendingUpIcon sx={{ color: "var(--dashstack-light-green)" }} />
        ) : (
          <TrendingDownIcon sx={{ color: "var(--dashstack-primary-error)" }} />
        )}
        <Typography
          sx={{
            color: isGrowth
              ? "var(--dashstack-light-green)"
              : "var(--dashstack-primary-error)",
            marginLeft: "6px",
            marginRight: "4px",
          }}
        >
          {growthCount}
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>{growthCountText}</Typography>
      </Box>
    </Box>
  );
};

export default DashbaordCard;
