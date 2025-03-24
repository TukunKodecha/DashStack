import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, Box, useMediaQuery } from "@mui/material";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { showToast } from "../../store/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import Spinner from "../ui/Spinner";
import { loginSchema } from "../../validations/authValidation";

const LoginForm = () => {
  // props & state values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {},
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, userRole } = useSelector((state) => state.auth);

  const isMobile = useMediaQuery("(max-width:600px)");

  const loginFormStyles = {
    headingStyles: {
      fontWeight: 700,
      fontSize: "30px",
      lineHeight: "120%",
      color: "var(--dashstack-black)",
      textAlign: isMobile ? "start" : "center",
      width: isMobile ? "100%" : "revert",
    },
    subHeadingStyles: {
      fontSize: "20px",
      color: isMobile ? "var(--dashstack-white)" : "var(--dashstack-black)",
      textAlign: isMobile ? "start" : "left",
      marginTop: "5px", // 5px,
      width: isMobile ? "100%" : "revert",
      lineHeight: "120%",
    },
    greenLineSeperator: {
      width: "69px",
      height: "7px",
      backgroundColor: "var(--dashstack-light-green)",
      margin: isMobile ? "16px auto 16px" : "24px 0px 24px",
      marginInline: "auto",
    },
  };

  // callbacks & functions
  useEffect(() => {
    if (userRole) {
      navigate("/dashboard");
      return;
    }
    if (error) {
      dispatch(
        showToast({
          message: error || "Could not process the request. Please try again.",
          severity: "error",
        })
      );
    }
  }, [error, dispatch, userRole, navigate]);

  const onSubmit = async (data) => {
    dispatch(login({ email: data.email, password: data.password }));
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 0,
          mb: 0,
          padding: "20px",
          backgroundColor: "var(--dashstack-primary-bg)",
          borderRadius: "30px",
          minWidth: isMobile ? "100%" : "500px",
        }}
      >
        {isMobile ? (
          <Box
            sx={{
              height: "128px",
              width: "100%",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              marginBottom: "32px",
              justifyContent: "flex-end",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                paddingLeft: "25px",
                paddingBottom: "35px",
              }}
            >
              <Typography sx={loginFormStyles.headingStyles}>
                Log In to
              </Typography>
              <Typography sx={loginFormStyles.headingStyles}>
                {config.APP_NAME}
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Typography sx={loginFormStyles.headingStyles}>
              Log In / Signup
            </Typography>
          </>
        )}

        {!isMobile && <Box sx={loginFormStyles.greenLineSeperator}></Box>}

        <Box
          sx={{
            paddingInline: isMobile ? "1.25rem" : 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "9px",
            }}
          >
            <Input
              type="text"
              label="E-mail"
              className="input-secondary"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              className="input-secondary"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "10px",
              justifyContent: "center",
              mt: "40px",
              mb: "48px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={loading}
              className="success-button"
              sx={{
                textTransform: "none",
                width: isMobile ? "100%" : "200px",
              }}
            >
              {loading ? <Spinner /> : "Log In"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
