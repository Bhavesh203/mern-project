const express = require("express");
const stripe = require("stripe")("sk_test_51R4b5mPEL4R8137THLkJMtwK7PtW4eg1JXBywgJFGfNO73G1C18YL8mgT6eOEbpBhXDwZ1uhxDKdLRvo6M2ZSb8d00j31J146g");
const router = express.Router();

router.post("/auth", async (req, res) => {
    try {
      const { cart } = req.body;
  
      // Construct line items for Stripe
      const lineItems = cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image], // Product image if available
          },
          unit_amount: item.price * 100, // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      }));
  
      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/payment-failed`,
      });
  
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).json({ message: "Failed to create payment session" });
    }
  });

module.exports = router;