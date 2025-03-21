import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./context/CartContext";

const OrderSuccess = () => {
    
    useEffect(() => {          
      return () => {
        
      }
    }, [])
    
    const { order } = useContext(CartContext); // Retrieve user from AuthContext
    return (
        <>
        <div className="w-fit m-auto">
            <h1 className="monserrat-font">Thank you for your order</h1>

            <div className="confirm-green-box">
                <h5>ORDER CONFIRMATION</h5>
                <p>Your order {order?._id} has been sucessful!</p>
                <p>Thank you for choosing Oui Oui fashion. You will shortly receive a confirmation email.</p>
            </div>

            <button id="create-btn" className="btn btn-ouioui-secondary margin-left-5px">Back to shop</button>
        </div>
        </>
    )
}


export default OrderSuccess;