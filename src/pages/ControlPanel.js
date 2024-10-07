import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from '../api/axios';
import AddEditCategoryModal from "../components/AddEditCategoryModal";
import AddEditSubcategoryModal from "../components/AddEditSubcategoryModal";
import { useTranslation } from "react-i18next";

function ControlPanel() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const handleDeleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    fetchCategories();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t("controlPanel")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setOpenCategoryModal(true)}
      >
        {t("addCategory")}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("nameArabic")}</TableCell>
            <TableCell>{t("nameEnglish")}</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name.ar}</TableCell>
              <TableCell>{category.name.en}</TableCell>
              <TableCell>
                <img src={category.image} alt={category.name.en} width="50" />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    setEditingCategory(category);
                    setOpenCategoryModal(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteCategory(category._id)}>
                  <Delete />
                </IconButton>
                <Button
                  onClick={() => {
                    setCurrentCategory(category);
                    setOpenSubcategoryModal(true);
                  }}
                >
                  Subcategories
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* إضافة/تعديل صنف */}
      <AddEditCategoryModal
        open={openCategoryModal}
        handleClose={() => {
          setOpenCategoryModal(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        refresh={fetchCategories}
      />

      {/* إضافة/تعديل صنف فرعي */}
      {currentCategory && (
        <AddEditSubcategoryModal
          open={openSubcategoryModal}
          handleClose={() => {
            setOpenSubcategoryModal(false);
            setCurrentCategory(null);
          }}
          category={currentCategory}
        />
      )}
    </Container>
  );
}

export default ControlPanel;
