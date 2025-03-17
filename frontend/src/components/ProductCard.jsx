import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoBagHandle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { CartContext } from "../pages/context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
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
        onClick={()=> addToCart(product)}>
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
