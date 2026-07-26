import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/axiosConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get('/cart');
        setCartItems(res.data);
      } catch (err) {
        console.error('Gagal fetch cart:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await api.post('/cart', { productId, quantity });
      setCartItems(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || 'Gagal menambahkan' };
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const res = await api.put(`/cart/${productId}`, { quantity: newQuantity });
      setCartItems(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || 'Gagal update' };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      setCartItems(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || 'Gagal hapus' };
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.delete('/cart');
      setCartItems(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || 'Gagal kosongkan' };
    }
  };

  const checkout = async (orderData) => {
    try {
      const res = await api.post('/checkout', orderData);
      setCartItems([]);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || 'Checkout gagal' };
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      checkout,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);