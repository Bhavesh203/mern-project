import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://mern-project-1-9nl5.onrender.com/api/products`)
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // Ensure products is always an array
      });
  }, []);

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
