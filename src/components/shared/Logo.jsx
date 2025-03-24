import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Logo = ({ showLogo }) => {
  const { t } = useTranslation();

  return showLogo ? (
    <img src="./mart2-global-logo.png" />
  ) : (
    <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
      <span style={{ color: "var(--dashstack-light-blue)" }}>{t("Dash")}</span>
      {t("Stack")}
    </Typography>
  );
};

export default Logo;
