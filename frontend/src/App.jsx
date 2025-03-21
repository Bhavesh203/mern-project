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
import Cart from "./pages/Cart.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { CartProvider } from "./pages/context/CartContext.jsx";
import CompareProductPage from "./pages/ComapreProductPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Success from "./pages/Success.jsx";
import { AuthProvider } from "./pages/context/AuthContext.jsx";

const App = () => {

  return (
    <>

      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact-us" element={<ContactUs />} />
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
      {/* <AuthProvider>
        <Router>
        <Header />
          <Routes>
          </Routes>
        </Router>
        <Footer />
      </AuthProvider> */}
    </>
  );
};

export default App;
