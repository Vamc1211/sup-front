// Registration.js

import React, { useState } from 'react';
import axios from 'axios';
import regisclass from './Registration.module.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const toNavigate=useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        role,
        address,
      });
      console.log(response.data);
      alert("registered succesfully");
      toNavigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={regisclass.regispage}>
      
      <form onSubmit={handleRegister} className={regisclass.regisform} >
      <h1>Registration</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={regisclass.username}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={regisclass.password}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}  className={regisclass.role}>
          <option value="">Select Role</option>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Transporter">Transporter</option>
        </select>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={regisclass.address}
        />
        <button type="submit"  className={regisclass.btn}>Register</button>
      </form>
    </div>
  );
};

export default Registration;
