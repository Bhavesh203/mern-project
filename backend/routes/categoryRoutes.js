const express = require("express");
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/CategoryController");
const router = express.Router();

// Get all products
router.get("/", getCategories);

// Create a new product
router.post("/", createCategory);

// Update Category
router.put("/:id", updateCategory);

// Delete Category
router.delete("/:id", deleteCategory);

module.exports = router;
