import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Typography,
  IconButton,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
    document.body.dir = event.target.value === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
          <RestaurantMenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          مطعم وبار
        </Typography>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          style={{ color: "white", marginRight: "20px" }}
        >
          <MenuItem value="ar">العربية</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            {t("logout")}
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            {t("login")}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
