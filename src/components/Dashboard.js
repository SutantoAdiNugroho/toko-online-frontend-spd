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
      }
    };
    fetchProtected();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Selamat datang, {user?.username}!</p>
      <p>Protected data backend: {data}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;