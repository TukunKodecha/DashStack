import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export const dashboardCardData = [
    {
        backgroundColor: "var(--dashstack-primary-bg)",
        color: "var(--dashstack-secondary-bg)",
        count: "40689",
        growthCount: "8.5%",
        growthCountText: "Up from yesterday",
        primaryText: "Total User",
        Icon: PeopleOutlineIcon,
        isGrowth: true,
        id: 1
    },
    {
        backgroundColor: "var(--dashstack-warning-light)",
        color: "var(--dashstack-primary-warning)",
        count: "10293",
        growthCount: "1.3%",
        growthCountText: "Up from past week",
        primaryText: "Total Order",
        Icon: PeopleOutlineIcon,
        isGrowth: true,
        id: 2
    },
    {
        backgroundColor: "var(--dashstack-light-green-2)",
        color: "var(--dashstack-light-green)",
        count: "$89000",
        growthCount: "4.3%",
        growthCountText: "Down from yesterday",
        primaryText: "Total Sales",
        Icon: PeopleOutlineIcon,
        isGrowth: false,
        id: 3
    },
    {
        backgroundColor: "var(--dashstack-secondary-error)",
        color: "var(--dashstack-primary-error)",
        count: "2040",
        growthCount: "1.8%",
        growthCountText: "Up from yesterday",
        primaryText: "Total Pending",
        Icon: PeopleOutlineIcon,
        isGrowth: true,
        id: 4
    }
];