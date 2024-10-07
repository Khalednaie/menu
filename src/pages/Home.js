import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/menu")}
      >
        {t("menu")}
      </Button>
      <Box mt={5} display="flex" gap={2}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/facebook-logo.png" alt="Facebook" width="40" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/instagram-logo.png" alt="Instagram" width="40" />
        </a>
      </Box>
    </Box>
  );
}

export default Home;
