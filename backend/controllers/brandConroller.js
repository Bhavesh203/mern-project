const { json } = require("express");
const Brand = require("../models/Brand");

// Display All Brand
const getAllBrand = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create Brand
const createBrand = async (req, res) => {
    const { name } = req.body;
    const brand = new Brand({ name });
    try {
        await brand.save();
        res.json(brand);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Brand
const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const brand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

// Delete Brand
const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        await Brand.findByIdAndDelete(id);
        res.json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = { getAllBrand, updateBrand, deleteBrand, createBrand };