const express = require("express");
const { getAllBrand, createBrand, updateBrand, deleteBrand } = require("../controllers/brandConroller");
const router = express.Router();

// Get all Brand
router.get("/", getAllBrand);

// Create a new Brand
router.post("/", createBrand);

// Update Brand
router.put("/:id", updateBrand);

// Delete Brand
router.delete("/:id", deleteBrand);

module.exports = router;