import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { MdDeleteOutline } from "react-icons/md";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify CSS

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const notify = () => toast("Product Removed Succesfully !");
    // Calculate the total cost
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Placeholder function for handling cart update
    const handleCartUpdate = () => {
        console.log("Cart updated");
    };

    return (
        <div className="p-6">
            <ToastContainer/>
            {/* Breadcrumb Navigation */}
            <nav className="text-sm text-gray-500 mb-4">
                {/* <span>Home &gt; Shop &gt; Cart</span> */}
            </nav>

            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="mb-5">
                    {/* Table Layout for Cart Items */}
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
                                <tr key={item._id} className="border-t">
                                    <td className="p-2 flex items-center gap-4">
                                        <img
                                            src={`http://localhost:5000/media/${item.image}`}
                                            alt={item.name}
                                            className="w-20 h-20 object-contain"
                                        />
                                        <span>{item.name}</span>
                                    </td>
                                    <td className="p-2">${item.price}</td>
                                    <td className="p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(item._id, Number(e.target.value))
                                            }
                                            className="w-12 border p-1 text-center"
                                        />
                                    </td>
                                    <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => {
                                                removeFromCart(item._id);
                                                notify();
                                            }}
                                            className="text-red-500 flex items-center gap-2"
                                        >
                                            <MdDeleteOutline className="text-2xl" />
                                            Remove
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Cart Totals Section */}
                    <div className="p-4 mt-4 bg-gray-100 border rounded">
                        <h3 className="font-bold mb-2">Cart Totals</h3>
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
                            Proceed to Checkout
                        </button>
                    </div>

                    {/* Coupon Code Section */}
                    <div className="p-4 bg-gray-50 border rounded mt-4">
                        <h3 className="font-bold mb-2">Apply Coupon</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Coupon code"
                                className="border p-2 flex-grow"
                            />
                            <button className="bg-green-500 text-white px-4 rounded">
                                Apply Coupon
                            </button>
                        </div>
                    </div>

                    {/* Update Cart Button */}
                    <button
                        onClick={handleCartUpdate}
                        className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                        Update Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
