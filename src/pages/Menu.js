import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Menu() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const handleCategoryClick = async (categoryId) => {
    const res = await axios.get(
      `http://localhost:5000/api/subcategories/category/${categoryId}`
    );
    setSelectedSubcategories(res.data);
    setOpen(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t("menu")}
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card
              onClick={() => handleCategoryClick(category._id)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name[i18n.language]}
              />
              <CardContent>
                <Typography variant="h6">
                  {category.name[i18n.language]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* نافذة الأصناف الفرعية */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            {t("subcategories")}
          </Typography>
          <Grid container spacing={2}>
            {selectedSubcategories.map((sub) => (
              <Grid item xs={12} sm={6} md={4} key={sub._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={sub.image}
                    alt={sub.name[i18n.language]}
                  />
                  <CardContent>
                    <Typography variant="h6">
                      {sub.name[i18n.language]}
                    </Typography>
                    <Typography variant="body2">
                      {sub.description[i18n.language]}
                    </Typography>
                    <Typography variant="subtitle1">${sub.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}

export default Menu;
