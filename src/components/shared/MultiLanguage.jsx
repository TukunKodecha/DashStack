import React from "react";
import { useTranslation } from "react-i18next";
import {
  MenuItem,
  Box,
  Select,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/languageSlice";

const MultiLanguage = () => {
  const { t, i18n } = useTranslation();

  const isMobile = useMediaQuery("(max-width:900px)");

  const { language } = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    dispatch(setLanguage(selectedLang));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: isMobile ? 0 : 3,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <FormControl fullWidth>
        <Select
          labelId="language-select-label"
          value={language}
          onChange={handleChange}
          displayEmpty
          sx={{
            height: "30px",
            backgroundColor: "transparent !important",
            borderRadius: "10px !important",
            "& .MuiInputBase-root": {
              backgroundColor: "transparent !important",
              borderRadius: "10px !important",
              border: "none !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none !important",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none !important",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none !important",
            },
          }}
        >
          <MenuItem
            value="en"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {t("English")}
          </MenuItem>
          <MenuItem
            value="fr"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {t("French")}
          </MenuItem>
          <MenuItem
            value="es"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {t("Spanish")}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultiLanguage;
