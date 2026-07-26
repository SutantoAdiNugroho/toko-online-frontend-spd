import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const handleUpdateQty = async (productId, newQty) => {
    await updateQuantity(productId, newQty);
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
  };

  const handleClear = async () => {
    await clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-empty">
          <h2>🛒 Keranjang Kosong</h2>
          <p>Yuk, belanja dulu</p>
          <Link to="/dashboard" className="btn-back">Lihat Produk</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-wrapper">
        <h2>🛒 Keranjang Belanja</h2>
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item.productId}>
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Rp {item.price.toLocaleString()}</p>
                <div className="cart-item-qty">
                  <button onClick={() => handleUpdateQty(item.productId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQty(item.productId, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.productId)} className="cart-remove">Hapus</button>
              </div>
              <div className="cart-item-subtotal">
                Rp {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">Total: Rp {totalPrice.toLocaleString()}</div>
          <div className="cart-actions">
            <button onClick={handleClear} className="btn-clear">Kosongkan</button>
            <Link to="/checkout" className="btn-checkout">Checkout</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;