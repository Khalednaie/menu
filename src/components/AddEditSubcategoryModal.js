import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import {Edit,Delete} from '@mui/icons-material'
import axios from "axios";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AddEditSubcategoryModal({ open, handleClose, category }) {
  const { t } = useTranslation();
  const [subcategories, setSubcategories] = useState([]);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [editingSubcategory, setEditingSubcategory] = useState(null);

  useEffect(() => {
    if (category) {
      fetchSubcategories();
    }
  }, []);

  const fetchSubcategories = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/subcategories/category/${category._id}`
    );
    setSubcategories(res.data);
  };

  const handleDeleteSubcategory = async (id) => {
    await axios.delete(`http://localhost:5000/api/subcategories/${id}`);
    fetchSubcategories();
  };

  const handleSubmit = async () => {
    const data = {
      category: category._id,
      name: { ar: nameAr, en: nameEn },
      description: { ar: descriptionAr, en: descriptionEn },
      price,
      image,
    };
    if (editingSubcategory) {
      await axios.put(
        `http://localhost:5000/api/subcategories/${editingSubcategory._id}`,
        data
      );
    } else {
      await axios.post("http://localhost:5000/api/subcategories", data);
    }
    fetchSubcategories();
    handleCloseModal();
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory);
    setNameAr(subcategory.name.ar);
    setNameEn(subcategory.name.en);
    setDescriptionAr(subcategory.description.ar);
    setDescriptionEn(subcategory.description.en);
    setPrice(subcategory.price);
    setImage(subcategory.image);
  };

  const handleCloseModal = () => {
    setEditingSubcategory(null);
    setNameAr("");
    setNameEn("");
    setDescriptionAr("");
    setDescriptionEn("");
    setPrice("");
    setImage("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {editingSubcategory ? t("editSubcategory") : t("addSubcategory")}
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
          label={t("descriptionArabic")}
          fullWidth
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label={t("descriptionEnglish")}
          fullWidth
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label={t("price")}
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
          <Button onClick={handleCloseModal}>{t("cancel")}</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {t("submit")}
          </Button>
        </Box>

        {/* قائمة الأصناف الفرعية */}
        <Box mt={4}>
          <Typography variant="h6">{t("subcategories")}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("nameArabic")}</TableCell>
                <TableCell>{t("nameEnglish")}</TableCell>
                <TableCell>{t("price")}</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategories.map((sub) => (
                <TableRow key={sub._id}>
                  <TableCell>{sub.name.ar}</TableCell>
                  <TableCell>{sub.name.en}</TableCell>
                  <TableCell>{sub.price}</TableCell>
                  <TableCell>
                    <img src={sub.image} alt={sub.name.en} width="50" />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditSubcategory(sub)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteSubcategory(sub._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddEditSubcategoryModal;
