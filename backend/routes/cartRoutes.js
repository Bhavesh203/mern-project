const express = require("express");
const Cart = require("../models/Cart");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

// ✅ Get cart by user ID
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

// ✅ Add item to cart
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;
  try {
    if (!userId || !product || !product._id) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error); // Log full error
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
});

// getcart by user
router.get("/cart", verifyToken, async (req, res) => {
  try {
      const userId = req.user.id; // Ensure user ID is extracted correctly
      const cart = await Cart.findOne({ userId }).populate("items.product");

      if (!cart) {
          return res.status(200).json({ items: [] }); // Return empty cart if not found
      }

      res.status(200).json(cart);
  } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Remove item from cart
router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
});
router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
    await cart.save();

    res.json(cart); // Return updated cart
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
});

// ✅ Update quantity
router.put("/update/:userId/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.productId.toString() === req.params.productId);
    if (item) item.quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
});

// ✅ Clear cart
router.delete("/clear/:userId", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

module.exports = router;
