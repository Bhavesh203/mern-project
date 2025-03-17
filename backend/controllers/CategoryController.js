const Category = require("../models/Category");

// Display All category
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create Categories
const createCategory = async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name });
    try {
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete Category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await Category.findByIdAndDelete(id);
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
