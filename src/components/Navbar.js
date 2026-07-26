import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard" className="brand-link">🛍️ TokoAdi</Link>
      </div>
      <div className="navbar-menu">
        <span className="navbar-user">👤 {user?.username}</span>
        <Link to="/dashboard" className="nav-link">Produk</Link>
        <Link to="/cart" className="nav-link">
          🛒 Keranjang <span className="cart-badge">{totalItems}</span>
        </Link>
        <button onClick={handleLogout} className="navbar-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;