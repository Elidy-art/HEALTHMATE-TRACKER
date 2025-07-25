import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/users/register', form);
    setUser(res.data);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input className="block w-full mb-2 p-2 border" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="block w-full mb-2 p-2 border" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="block w-full mb-2 p-2 border" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
