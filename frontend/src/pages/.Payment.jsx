import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "./context/CartContext";

const stripePromise = loadStripe("pk_test_51R4b5mPEL4R8137TgbRD7X2QxkEYeDx4hzKOrWbRooCk8S1Iy9N2RixtbwxDFmXiTrd4sW8oAAKniq4dP4U6z3Ae00cgeNqAeT"); // 🔴 Replace with your Stripe public key

const Payment = () => {
    const { clearCart } = useContext(CartContext);
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    const handlePayment = async () => {
        const stripe = await stripePromise;

        const response = await fetch("http://localhost:5000/api/payments/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, amount }),
        });

        const session = await response.json();

        if (session.url) {
            window.location.href = session.url; // ✅ Redirect to Stripe payment page
            clearCart([]);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <p>Order ID: {orderId}</p>
            <p>Total Amount: ${amount}</p>

            <button onClick={handlePayment} className="mt-4 bg-green-500 text-white py-2 px-4 rounded w-full">
                Pay with Stripe
            </button>
        </div>
    );
};

export default Payment;
