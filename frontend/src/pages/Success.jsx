import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-2 text-lg">Thank you for your purchase.</p>
            <Link to="/" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Go to Home
            </Link>
        </div>
    );
};

export default Success;
