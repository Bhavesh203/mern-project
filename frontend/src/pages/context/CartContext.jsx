import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // ✅ Move inside function
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/cart/${user._id}`)
        .then((response) => setCart(response.data.items))
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return console.error("User not logged in");

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId: user._id,
        product,
      });
      setCart(response.data.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const removeFromCart = async (productId) => {
    if (!user) return console.error("User not logged in");
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${user._id}/${productId}`);
      
      // ✅ Ensure correct ID matching
      setCart(response.data.items); 
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  

  const updateQuantity = async (productId, quantity) => {
    if (!user) return console.error("User not logged in");

    try {
      await axios.put(`http://localhost:5000/api/cart/update/${user._id}/${productId}`, { quantity });
      setCart(cart.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    if (!user) return console.error("User not logged in");

    try {
      await axios.delete(`http://localhost:5000/api/cart/clear/${user._id}`);
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, calculateTotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
