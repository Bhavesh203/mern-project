const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51R4b5mPEL4R8137THLkJMtwK7PtW4eg1JXBywgJFGfNO73G1C18YL8mgT6eOEbpBhXDwZ1uhxDKdLRvo6M2ZSb8d00j31J146g"); // 🔴 Replace with your Stripe secret key

router.post("/payments/create-checkout-session", async (req, res) => {
    try {
        const { amount } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "E-Commerce Order" },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/payment-success",
            cancel_url: "http://localhost:5173/payment-failed",
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({ message: "Error processing payment", error });
    }
});

module.exports = router;
