import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    price: "",
    brand: "",
    category: "",
    rating: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });
  const [brandFormData, setBrandFormData] = useState({
    name: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProductId, setUpdateProductId] = useState(null);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);
  const [iseUpdatingBrand, setIsUpdatingBrand] = useState(false);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);
  const [updateBrandId, setUpdateBrandId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get(`https://mern-project-1-9nl5.onrender.com/api/products`);
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(`https://mern-project-1-9nl5.onrender.com/api/categories`);
    setCategories(data);
  };
  const fetchBrands = async () => {
    const { data } = await axios.get(`https://mern-project-1-9nl5.onrender.com/api/brands`);
    setBrands(data);
  };

  const fetchUsers = async ()=>{
    const {data} = await axios.get(`https://mern-project-1-9nl5.onrender.com/api/auth/users`);
    setUsers(data);
  }
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (isUpdating) {
      await axios.put(
        `https://mern-project-1-9nl5.onrender.com/api/products/${updateProductId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setIsUpdating(false);
      setUpdateProductId(null);
    } else {
      await axios.post(`https://mern-project-1-9nl5.onrender.com/api/products`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    fetchProducts();
    setFormData({
      name: "",
      image: null,
      price: "",
      brand: "",
      category: "",
      rating: "",
    });
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`https://mern-project-1-9nl5.onrender.com/api/products/${id}`);
    fetchProducts();
  };

  const handleUpdateProduct = (id) => {
    const product = products.find((product) => product._id === id);
    setFormData({
      name: product.name,
      image: null,
      price: product.price,
      brand: product.brand,
      category: product.category,
      rating: product.rating,
    });
    setIsUpdating(true);
    setUpdateProductId(id);
  };

  const handleCancelUpdate = () => {
    setIsUpdating(false);
    setUpdateProductId(null);
    setFormData({
      name: "",
      image: null,
      price: "",
      brand: "",
      category: "",
      rating: "",
    });
  };

  const handleCategoryForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://mern-project-1-9nl5.onrender.com/api/categories`,
        categoryFormData
      );
      setCategoryFormData({ name: "" });
      fetchCategories(); // Refresh the categories list
      alert("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category.");
    }
  };

  const handleBrandForm = async (e) => {
    e.preventDefault();
    try {
      console.log("Brand Form Data:", brandFormData); // Log the payload
      await axios.post("https://mern-project-1-9nl5.onrender.com/api/brands", brandFormData);
      setBrandFormData({ name: "" });
      fetchBrands(); // Refresh the brands list
      alert("Brand created successfully");
    } catch (error) {
      console.error("Error creating brand:", error);
      alert("Failed to create brand.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://mern-project-1-9nl5.onrender.com/api/categories/${updateCategoryId}`,
        categoryFormData
      );
      setCategoryFormData({ name: "" });
      setIsUpdatingCategory(false);
      setUpdateCategoryId(null);
      fetchCategories(); // Refresh the categories list
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category.");
    }
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://mern-project-1-9nl5.onrender.com/api/brands/${updateBrandId}`,
        brandFormData
      );
      setBrandFormData({ name: "" });
      setIsUpdatingBrand(false);
      setUpdateBrandId(null);
      fetchBrands(); // Refresh the brands list
    } catch (error) {
      console.error("Error updating brand:", error);
      alert("Failed to Update brand");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`https://mern-project-1-9nl5.onrender.com/api/categories/${id}`);
      fetchCategories(); // Refresh the categories list
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category.");
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      await axios.delete(`https://mern-project-1-9nl5.onrender.com/api/brands/${id}`);
      fetchBrands(); // Refresh the categories list
      alert("Brands deleted successfully!");
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("Failed to delete brand.");
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Panel</h2>

      <motion.form
        onSubmit={
          isUpdatingCategory ? handleUpdateCategory : handleCategoryForm
        }
        className="bg-white p-6 rounded-lg shadow-md mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4">
          {isUpdatingCategory ? "Update Category" : "Create Category"}
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={categoryFormData.name}
          onChange={(e) => setCategoryFormData({ name: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-all"
        >
          {isUpdatingCategory ? "Update Category" : "Create Category"}
        </button>
        {isUpdatingCategory && (
          <button
            type="button"
            onClick={() => {
              setIsUpdatingCategory(false);
              setUpdateCategoryId(null);
              setCategoryFormData({ name: "" });
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-all ml-4"
          >
            Cancel
          </button>
        )}
      </motion.form>

      <motion.form
        onSubmit={iseUpdatingBrand ? handleUpdateBrand : handleBrandForm}
        className="bg-white p-6 rounded-lg shadow-md mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4">
          {iseUpdatingBrand ? "Update Brand" : "Create Brand"}
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={brandFormData.name}
          onChange={(e) => setBrandFormData({ name: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-all"
        >
          {iseUpdatingBrand ? "Update Brand" : "Create Brand"}
        </button>
        {iseUpdatingBrand && (
          <button
            type="button"
            onClick={() => {
              setIsUpdatingBrand(false);
              setUpdateBrandId(null);
              setBrandFormData({ name: "" });
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-all ml-4"
          >
            Cancel
          </button>
        )}
      </motion.form>
      <div className="overflow-x-auto mb-10">
        <motion.table
          className="w-full bg-white shadow-md rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Brand Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <motion.tr key={brand._id} className="border-b hover:bg-gray-100">
                <td className="p-3 text-center">{brand.name}</td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setBrandFormData({ name: brand.name });
                      setIsUpdatingBrand(true);
                      setUpdateBrandId(brand._id);
                    }}
                    className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition-all"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteBrand(brand._id)}
                    className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-all"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <div className="overflow-x-auto mb-10">
        <motion.table
          className="w-full bg-white shadow-md rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Category Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <motion.tr
                key={category._id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3 text-center">{category.name}</td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setCategoryFormData({ name: category.name });
                      setIsUpdatingCategory(true);
                      setUpdateCategoryId(category._id);
                    }}
                    className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition-all"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-all"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <motion.form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Object.keys(formData).map((key) =>
          key === "category" ? (
            <select
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : key === "brand" ? (
            <select
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          ) : key !== "image" ? (
            <input
              key={key}
              type={key === "price" || key === "rating" ? "number" : "text"}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={formData[key]}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          ) : (
            <input
              key={key}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          )
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-all"
        >
          {isUpdating ? "Update Product" : "Create Product"}
        </button>
        {isUpdating && (
          <button
            type="button"
            onClick={handleCancelUpdate}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-all"
          >
            Cancel
          </button>
        )}
      </motion.form>

      <div className="overflow-x-auto">
        <motion.table
          className="w-full bg-white shadow-md rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Image</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Brand</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Rating</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const category = categories.find(
                (cat) => cat._id === product.category
              );
              const brand = brands.find((brand) => brand._id === product.brand);
              return (
                <motion.tr
                  key={product._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3 text-center">
                    <Link target="_" to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                    <img
                      src={`https://mern-project-1-9nl5.onrender.com/media/${product.image}`}
                      alt={product.name}
                      className="w-12 h-12 object-cover mx-auto"
                    />
                  </td>
                  <td className="p-3 text-center">${product.price}</td>
                  <td className="p-3 text-center">
                    {brand ? brand.name : "N/A"}
                  </td>
                  <td className="p-3 text-center">
                    {category ? category.name : "N/A"}
                  </td>
                  <td className="p-3 text-center">{product.rating}</td>
                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-all"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdateProduct(product._id)}
                      className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition-all"
                    >
                      Update
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </motion.table>
      </div>

      <div className="overflow-x-auto mb-10">
        <motion.table
          className="w-full bg-white shadow-md rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3 text-center">{user.username}</td>
                <td className="p-3 flex gap-3 justify-center">
                  {/* <button
                    onClick={() => {
                      setCategoryFormData({ name: user.name });
                      setIsUpdatingCategory(true);
                      setUpdateCategoryId(user._id);
                    }}
                    className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition-all"
                  >
                    Update
                  </button> */}
                  <button
                    // onClick={() => handleDeleteCategory(user._id)}
                    className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-all"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default Admin;
