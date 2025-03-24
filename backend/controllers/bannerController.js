const Banner = require("../models/Banner");

const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBanner = async (req, res) => {
    const image = req.file ? req.file.filename : null;

    if (!image) {
        return res.status(400).json({ message: "Please upload an image" });
    }

    try {
        const newBanner = new Banner({
            image
        });
        const savedBanner = await newBanner.save();
        res.status(201).json({
            message: "Banner created successfully",
            banner: savedBanner
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            await banner.deleteOne();
            res.json({ message: "Banner deleted successfully" });
        } else {
            res.status(404).json({ message: "Banner not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getBanners, createBanner, deleteBanner};