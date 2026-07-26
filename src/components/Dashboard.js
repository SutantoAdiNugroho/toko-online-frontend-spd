import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import api from '../utils/axiosConfig';

const Dashboard = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Gagal fetch produk:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      setNotification('Produk ditambahkan ke keranjang!');
    } else {
      setNotification(result.msg);
    }
    setTimeout(() => setNotification(''), 2000);
  };

  if (loading) return <div className="loading-text">Memuat produk...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h2>Selamat datang, {user?.username}!</h2>
          <p>Pilih produk favoritmu</p>
        </div>
        {notification && <div className="notification success">{notification}</div>}
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-price">Rp {product.price.toLocaleString()}</div>
                <div className="product-stock">Stok: {product.stock}</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Habis' : 'Tambah ke Keranjang'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;