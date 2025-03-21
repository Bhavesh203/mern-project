import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { MdDeleteOutline } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./context/AuthContext";
// toast.configure();
const stripePromise = loadStripe("pk_test_51R4b5mPEL4R8137TgbRD7X2QxkEYeDx4hzKOrWbRooCk8S1Iy9N2RixtbwxDFmXiTrd4sW8oAAKniq4dP4U6z3Ae00cgeNqAeT");

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const { user, token } = useContext(AuthContext); 
    const navigation = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = async () => { 
        // Check User Is LOged in Or not if loged in than only navigate checkout
            if (!user) {
            toast.error("Please log in first!", { position: "top-right" });
            return;
          }
            navigation('/checkout')
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table className="w-full border text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Subtotal</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.productId?._id || item.productId} className="border-t">
                                <td className="p-2 flex items-center gap-4">
                                    <img src={`http://localhost:5000/media/${item.image}`} className="w-20 h-20 object-contain" />
                                    <span>{item.name}</span>
                                </td>
                                <td className="p-2">${item.price}</td>
                                <td className="p-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                                        className="w-12 border p-1 text-center"
                                    />
                                </td>
                                <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                                <td className="p-2">
                                    <button onClick={() => removeFromCart(item.productId)} className="text-red-500 flex items-center gap-2">
                                        <MdDeleteOutline className="text-2xl" />
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-200">
                            <td colSpan="4" className="p-2 text-right">
                                Grand Total: ${calculateTotal()}
                            </td>
                            <td colSpan="1" className="p-2">
                                <button onClick={handleCheckout} className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded">
                                    Checkout
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default Cart;

