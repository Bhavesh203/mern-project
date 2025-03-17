const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require("../controllers/productController");
const multer = require("multer");
const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "media/"); // Save in 'media' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({ storage });

// Get all products
router.get("/", getProducts);

// Create a new product
router.post("/", upload.single("image"), createProduct);

// Update a product
router.put("/:id", upload.single("image"), updateProduct);

// Get Product By Id
router.get("/:id", getProductById);

// Delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
