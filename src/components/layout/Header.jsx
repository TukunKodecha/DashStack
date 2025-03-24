import React, { useState } from "react";

// third-party imports
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Typography,
  Box,
  Popper,
  useMediaQuery,
  ClickAwayListener,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

// project imports
// import Logo from "../shared/Logo";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN } from "../../utils/constant";
import MenuIcon from "@mui/icons-material/Menu";
import { setDrawerOpen, setIsMenuCollapsed } from "../../store/sidebarSlice";
import { logout } from "../../store/authSlice";
import SearchInput from "../ui/SearchInput";
import MultiLanguage from "../shared/MultiLanguage";
import { useTranslation } from "react-i18next";

const Header = () => {
  // props & state values
  const { userRole } = useSelector((state) => state.auth);
  const { isMenuCollapsed, drawerOpen } = useSelector((state) => state.sidebar);

  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const profilePopperItems = [
    {
      text: `${t("Logout")}`,
      id: 4,
      lastItem: true,
    },
  ];

  // callbacks & function values
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleProfilePopperItemClick = (item) => {
    if (item === "Logout") {
      dispatch(logout());
      setAnchorEl(null);
      navigate("/");
    }
  };

  const handleMenuIconClick = () => {
    if (isMobile) {
      dispatch(setDrawerOpen(!drawerOpen));
    } else {
      dispatch(setIsMenuCollapsed(!isMenuCollapsed));
    }
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px",
        padding: "20px",
        position: "relative",
        zIndex: 1,
        background: "var(--dashstack-white)",
        borderBottom: "1px solid var(--dashstack-secondary_border)",
        boxSizing: "border-box",
      }}
    >
      <>
        <IconButton
          disableRipple
          sx={{
            padding: 0,
            backgroundColor: "transparent",
            height: "20px",
            width: "20px",
            marginRight: "20px",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={handleMenuIconClick}
        >
          <MenuIcon color={"var(--dashstack-black)"} />
        </IconButton>

        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t("Search")}
          startIcon={<SearchIcon sx={{ color: "var(--dashstack-black)" }} />}
          width={300}
        />

        <Box flexGrow={1} />

        <MultiLanguage />

        {!isMobile && (
          <Typography
            sx={{
              fontWeight: 700,
              color: isMobile
                ? "var(--dashstack-white)"
                : "var(--dashstack-black)",
            }}
          >
            {userRole === ADMIN ? t("Admin") : t("User")}{" "}
          </Typography>
        )}

        {!isMobile ? (
          <Button
            variant="outlined"
            className="outlined-secondary-button"
            sx={{
              width: "80px",
              height: "46px",
              marginLeft: isMobile ? 0 : "10px",
            }}
            onClick={handleClick}
            aria-describedby={id}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Avatar
                alt="user-profile"
                src={undefined}
                sx={{
                  width: "38px",
                  height: "38px",
                }}
              />
              <ExpandMoreIcon sx={{ color: "var(--dashstack-black)" }} />
            </Box>
          </Button>
        ) : (
          <Box
            sx={{
              height: "36px",
              width: "36px",
              borderRadius: "50%",
              background: "var(--dashstack-white)",
              border: "1px solid var(--dashstack-light-green)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleClick}
            aria-describedby={id}
          >
            <Avatar
              alt="user-profile"
              src={undefined}
              sx={{ width: "36px", height: "36px" }}
            />
          </Box>
        )}

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          sx={{
            marginTop: isMobile ? "11px !important" : "16px !important",
            boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px 0px 20px 20px",
            zIndex: 199,
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              sx={{
                padding: "14px 18px 30px 16px",
                bgcolor: "rgba(255, 255, 255, 1)",
                borderRadius: "20px 0px 20px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {profilePopperItems &&
                profilePopperItems.length > 0 &&
                profilePopperItems.map((item) => {
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        paddingBottom: item?.lastItem ? 0 : "11px",
                        borderBottom: item?.lastItem
                          ? "none"
                          : "1px solid var(--dashstack-secondary_border)",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "var(--dashstack-black)",
                          lineHeight: "120%",
                          paddingLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleProfilePopperItemClick(item.text)}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </ClickAwayListener>
        </Popper>
      </>
    </Box>
  );
};

export default Header;
