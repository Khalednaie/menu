import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AddEditCategoryModal({ open, handleClose, category, refresh }) {
  const { t } = useTranslation();
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (category) {
      setNameAr(category.name.ar);
      setNameEn(category.name.en);
      setImage(category.image);
    } else {
      setNameAr("");
      setNameEn("");
      setImage("");
    }
  }, [category]);

  const handleSubmit = async () => {
    const data = {
      name: { ar: nameAr, en: nameEn },
      image,
    };
    if (category) {
      await axios.put(
        `http://localhost:5000/api/categories/${category._id}`,
        data
      );
    } else {
      await axios.post("http://localhost:5000/api/categories", data);
    }
    refresh();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {category ? t("editCategory") : t("addCategory")}
        </Typography>
        <TextField
          label={t("nameArabic")}
          fullWidth
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          margin="normal"
        />
        <TextField
          label={t("nameEnglish")}
          fullWidth
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          margin="normal"
        />
        <TextField
          label={t("imageUrl")}
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={handleClose}>{t("cancel")}</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {t("submit")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddEditCategoryModal;
