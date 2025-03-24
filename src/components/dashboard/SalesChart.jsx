import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const salesData = {
  October: [20, 40, 35, 64.37, 45, 50, 30, 55, 42, 47, 43, 48],
  November: [30, 45, 50, 70, 55, 60, 35, 65, 52, 57, 53, 58],
  December: [25, 35, 40, 55, 50, 60, 45, 65, 60, 67, 63, 70],
};

const SalesChart = () => {
  const [month, setMonth] = useState("October");

  const { t } = useTranslation();

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const chartSeries = [
    {
      name: `${t("Sales")}`,
      data: salesData[month],
    },
  ];

  const chartOptions = useMemo(
    () => ({
      chart: {
        id: "sales-chart",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "easeout",
          speed: 800,
        },
        parentHeightOffset: 0, // Prevent overflow due to padding
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      xaxis: {
        categories: Array.from(
          { length: salesData[month].length },
          (_, i) => `${(i + 1) * 5}k`
        ),
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
          },
          formatter: (value) => `${value}%`,
        },
        min: 20,
        max: 100,
        tickAmount: 4,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      markers: {
        size: 4,
        colors: ["#1E90FF"],
        strokeColors: "#ffffff",
        strokeWidth: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 0.6,
          opacityTo: 0.1,
        },
      },
      tooltip: {
        theme: "light",
        x: {
          show: true,
        },
        y: {
          formatter: (value) => `${value.toFixed(2)}%`,
        },
      },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: "100%",
              height: "320px",
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "100%",
              height: "250px",
            },
          },
        },
      ],
    }),
    [month]
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        padding: isMobile ? "10px" : "15px",
        background: "var(--dashstack-white)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          {t("Sales Details")}
        </Typography>
        <Select
          value={month}
          onChange={handleChange}
          displayEmpty
          variant="outlined"
          sx={{
            width: isMobile ? 90 : 110,
            height: 35,
            background: "#fff",
            borderRadius: "5px",
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          <MenuItem value="October">October</MenuItem>
          <MenuItem value="November">November</MenuItem>
          <MenuItem value="December">December</MenuItem>
        </Select>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden", // Prevent scroll
          clipPath: "inset(0 0 0 0)", // Prevent tooltip overflow
        }}
      >
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={isMobile ? 250 : 350}
          width="100%"
        />
      </Box>
    </Box>
  );
};

export default SalesChart;
