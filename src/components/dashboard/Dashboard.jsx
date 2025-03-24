import { Box, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { dashboardCardData } from "../../utils/dashboardMockData";
import DashbaordCard from "./DashbaordCard";
import SalesChart from "./SalesChart";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "var(--dashstack-primary-bg)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "30px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
        {t("Dashboard")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Grid2 container spacing={2.5}>
          {dashboardCardData.map((data) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={data.id}>
              <DashbaordCard data={data} />
            </Grid2>
          ))}
        </Grid2>

        <SalesChart />
      </Box>
    </Box>
  );
};

export default Dashboard;
