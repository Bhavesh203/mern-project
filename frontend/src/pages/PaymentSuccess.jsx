import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-lg mx-auto text-center">
          <div className="flex justify-center">
            <img src="/success.gif" alt="" />
          </div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Successful! 🎉</h2>
            <p>Thank you for your purchase. Your order will be processed shortly.</p>
            <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Back to Home
            </button>
        </div>
    );
};

export default PaymentSuccess;
