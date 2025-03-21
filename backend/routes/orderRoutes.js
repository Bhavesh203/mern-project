const express = require("express");
const Order = require("../models/Order");
const { verifyToken, verifyAdmin } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const router = express.Router();

// Place an order
// Place an order
router.post("/", verifyToken, async (req, res) => {
    try {
        const { orderDetails, cartItems, totalAmount } = req.body;

        if (!orderDetails || cartItems.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const newOrder = new Order({
            UserId: req.user.id, // Attach logged-in user's ID
            orderDetails,
            cartItems,
            totalAmount,
            status: "Pending",
        });

        await newOrder.save();
        await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});



// Get order Data
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate("orderDetails");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get Order By UserId
router.get("/user/:userId", async (req, res) => {
    try {
        const {id} = req.params;
        const orders = await Order.find({ orderDetails: id }).populate("orderDetails");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.put("/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const status = req.body.status;
  
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order status updated successfully!", order });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });

// Delete Order ById
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Order.findByIdAndDelete(id);
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
});

// Get orders for the logged-in user
router.get("/my-orders", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Extract logged-in user's ID from the token
        const orders = await Order.find({ UserId: userId }).populate("UserId", "username email");

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


router.post("/payment/success", async (req, res) => {
    try {
        const { orderId } = req.body;

        // Find the order and update its status to 'Paid'
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "Paid" }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Payment successful", order: updatedOrder });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

module.exports = router;
