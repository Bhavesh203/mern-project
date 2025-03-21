const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure UserId is required
    orderDetails: {
        name: String,
        email: String,
        address: String,
        city: String,
        zip: String,
        country: String,
    },
    cartItems: [
        {
            name: String,
            price: Number,
            quantity: Number,
            image: String,
        },
    ],
    totalAmount: Number,
    status: { type: String, default: "Pending" },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
