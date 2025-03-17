const express = require("express");
const { getAllBrand, createBrand, updateBrand, deleteBrand } = require("../controllers/brandConroller");
const router = express.Router();

// Get All Brands
router.get("/", getAllBrand);

// Create Brands
router.post("/", createBrand);

// Updated Brand
router.put("/:id", updateBrand);

// Delete Brand
router.delete("/:id", deleteBrand);

module.exports = router;