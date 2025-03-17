const Product = require("../models/Product");


// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// Get Product By Id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const createProduct = async (req, res) => {
    const { name, price, brand, category, rating } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price || !brand || !category || !rating || !image) {
        return res.status(400).json({ message: "Invalid product data: All fields are required" });
    }

    try {
        const newProduct = new Product({ name, price, brand, category, rating, image });
        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "Product Created",
            product: savedProduct
        });
    } catch (error) {
        res.status(400).json({ message: "Invalid product data: Data validation error" });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.brand = req.body.brand || product.brand;
            product.category = req.body.category || product.category;
            // product.color = req.body.color || product.color; 
            product.rating = req.body.rating || product.rating;
            if (req.file) product.image = req.file.filename;
            await product.save();
            res.json({ message: "Product Updated", product });
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update product" });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: "Product Deleted" });
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, getProductById };
