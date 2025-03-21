import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoBagHandle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { AuthContext } from "../pages/context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const { user, token } = useContext(AuthContext); 

  const addToCartHandler = async () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!user) {
      const existingProduct = JSON.parse(localStorage.getItem("cart")) || [];
      // ✅ Store in local storage for guests
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        storedCart.push({ 
            productId: product._id, 
            name: product.name, 
            price: product.price, 
            image: product.image, 
            quantity: 1 
        });
    }
      localStorage.setItem("cart", JSON.stringify(storedCart)); // ✅ Save updated cart
    }
  
    // ✅ Add to DB if user is logged in
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId: user._id, // Ensure _id exists
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      toast.success("Added to cart!", { position: "top-right" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart", { position: "top-right" });
    }
  };
  
  

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
     <ToastContainer />
      <img
        src={`http://localhost:5000/media/${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-lg"
      />
      <Link to={`/product/${product._id}`} className="text-lg font-bold hover:text-blue-600 transition">
        {product.name}
      </Link>
      <p className="text-gray-600">${product.price}</p>

      <div className="flex justify-between items-center mt-4">
        <button 
          className="btn btn-primary flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => addToCartHandler(product)} // ✅ Fixed: Passing product
        >
          <IoBagHandle className="text-xl" />
          <span>Add To Cart</span>
        </button>
        <div className="flex gap-2">
          <button className="btn btn-secondary !p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <FaHeart className="text-red-500" />
          </button>
          <button className="btn btn-secondary !p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <IoBarChart className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
