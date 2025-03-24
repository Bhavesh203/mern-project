const express = require("express");
const multer = require("multer");
const { getBanners, createBanner, deleteBanner } = require("../controllers/bannerController");
const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "media/banner"); // Save in 'media' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({ storage });

// Get all products
router.get("/", getBanners);

// Create a new product
router.post("/", upload.single("image"), createBanner);

// Delete a product
router.delete("/:id", deleteBanner);

module.exports = router;
