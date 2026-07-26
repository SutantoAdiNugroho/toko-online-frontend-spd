import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, totalPrice, checkout } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await checkout(form);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } else {
      setError(result.msg);
    }
  };

  if (cartItems.length === 0 && !success) {
    return (
      <>
        <Navbar />
        <div className="cart-empty">
          <h2>Keranjang kosong</h2>
          <Link to="/dashboard" className="btn-back">Kembali Belanja</Link>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="checkout-success">
          <h2>✅ Pesanan Berhasil!</h2>
          <p>Terima kasih, {form.name}. Pesanan Anda akan segera diproses.</p>
          <Link to="/dashboard" className="btn-back">Lanjut Belanja</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-wrapper">
        <h2>🧾 Checkout</h2>
        <div className="checkout-grid">
          <div className="checkout-items">
            <h3>Ringkasan Pesanan</h3>
            {cartItems.map(item => (
              <div key={item.productId} className="checkout-item">
                <span>{item.name} x{item.quantity}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="checkout-total">Total: Rp {totalPrice.toLocaleString()}</div>
          </div>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Data Penerima</h3>
            <input
              type="text"
              name="name"
              placeholder="Nama lengkap"
              value={form.name}
              onChange={handleChange}
              required
              className="auth-input"
            />
            <textarea
              name="address"
              placeholder="Alamat pengiriman"
              value={form.address}
              onChange={handleChange}
              required
              className="auth-input"
              rows="3"
            />
            <input
              type="tel"
              name="phone"
              placeholder="No. HP"
              value={form.phone}
              onChange={handleChange}
              required
              className="auth-input"
            />
            {error && <div className="message-error">{error}</div>}
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Memproses...' : 'Pesan Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;