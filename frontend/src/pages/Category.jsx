import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/products`);
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/categories`);
    setCategories(data);
  };

  const fetchBrands = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/brands`);
    setBrands(data);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filters.category || product.category === filters.category) &&
      (!filters.brand || product.brand === filters.brand) &&
      (!filters.price || product.price <= filters.price)
  );

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <aside className="w-1/4 p-4 bg-gray-100">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        {/* Category Filter */}
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Brand Filter */}
        <select
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
        {/* Price Filter */}
        <input
          type="number"
          placeholder="Max Price"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
      </aside>

      {/* Product Listing */}
      <main className="w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-600">No products found</p>
        )}
      </main>
    </div>
  );
};

export default Category;
