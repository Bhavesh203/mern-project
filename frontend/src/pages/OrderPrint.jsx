import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderPrint = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/orders/${orderId}`)
            .then((res) => res.json())
            .then((data) => setOrder(data))
            .catch((err) => console.error(err));
    }, [orderId]);

    if (!order) return <p>Loading order details...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <p>Order ID: {order._id}</p>
            <p>Total Amount: ${order.totalAmount}</p>

            <table className="w-full border mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Product</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.cartItems.map((item) => (
                        <tr key={item._id} className="border-t">
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.quantity}</td>
                            <td className="p-2">${item.price}</td>
                            <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => window.print()}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                Print Order
            </button>
        </div>
    );
};

export default OrderPrint;
