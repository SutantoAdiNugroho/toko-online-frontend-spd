import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosConfig';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await api.get('/protected');
        setData(res.data.msg);
      } catch (err) {
        console.error(err);
        setData('Gagal mengambil data (pastikan backend menyala)');
      }
    };
    fetchProtected();
  }, []);

  return (
    <div className="auth-container">
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p className="greeting">Hello, <strong>{user?.username}</strong>! 👋</p>
        
        <div className="protected-data">
          <strong>Protected Data:</strong> {data}
        </div>

        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;