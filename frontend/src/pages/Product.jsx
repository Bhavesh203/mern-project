import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactImageMagnifier from "react-image-magnifier-zoom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `https://mern-project-1-9nl5.onrender.com/api/products/${id}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="py-5 flex">
        <div className=" h-full">
          <ReactImageMagnifier
            src={`https://mern-project-1-9nl5.onrender.com/media/${product.image}`}
            width={600}
            height={800}
            zoomWidth={300}
            zoomHeight={300}
            zoomLevel={1.5}
            magnifierBorder="1px solid #ccc" // Optional: Add styling for the magnifier
          />
        </div>
        <div className="product-info">
          <h1 className="text-[46px] mt-10 font-bold">{product.name}</h1>
          <p className="text-gray-600">${product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
