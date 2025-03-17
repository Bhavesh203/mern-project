import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import Product from "./pages/Product.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import AuthPage from "./pages/Auth/AuthPage.jsx";
import Category from "./pages/Category.jsx";
import Profile from "./pages/Profile.jsx";
import AdminRoute from "./pages/context/AdminRoute.jsx";
import Cart from "./pages/cart.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { CartProvider } from "./pages/context/CartContext.jsx";
import CompareProductPage from "./pages/ComapreProductPage.jsx";

const App = () => {

  return (
    <CartProvider>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-account" element={<Profile />} />
        <Route path="/compare-product" element={<CompareProductPage />} />
        <Route element={<AdminRoute />}>          
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
    </CartProvider>
  );
};

export default App;
