import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const stripePromise = loadStripe("pk_test_51R4b5mPEL4R8137TgbRD7X2QxkEYeDx4hzKOrWbRooCk8S1Iy9N2RixtbwxDFmXiTrd4sW8oAAKniq4dP4U6z3Ae00cgeNqAeT");

const Checkout = () => {
    const { cart, calculateTotal, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        country: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
    
        try {
            // Step 1: Create the order
            const orderResponse = await axios.post("http://localhost:5000/api/orders", {
                orderDetails: formData,  // ✅ Match the backend expected field name
                cartItems: cart,
                totalAmount: parseFloat(calculateTotal()),
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            
    
            if (orderResponse.status === 201) {
                const order = orderResponse.data.order; // Assuming the response includes the created order details
                console.log("Order created successfully:", order);
    
                // Step 2: Redirect to the payment gateway (Stripe)
                const stripe = await stripePromise;
                const paymentResponse = await axios.post("http://localhost:5000/api/checkout/auth", {
                    cart,
                    orderId: order._id, // Pass the order ID to associate the payment with the order
                });
    
                if (paymentResponse.status === 200) {
                    const { sessionId } = paymentResponse.data;
    
                    // Redirect to Stripe Checkout
                    const { error } = await stripe.redirectToCheckout({ sessionId });
                    if (error) {
                        console.error("Stripe redirection error:", error);
                        alert("Failed to redirect to payment gateway. Please try again.");
                    }
                }
            } else {
                alert("Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Error during checkout process:", error.response?.data || error.message);
            alert("Checkout failed. Please try again.");
        }
    };
    

    return (
        <div className="p-6 max-w-lg mx-auto">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="border p-2 w-full" />
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
                <button
                    onClick={handleCheckout}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded w-full"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Checkout;
