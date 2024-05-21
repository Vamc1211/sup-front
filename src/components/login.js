import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import logincss from './login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
       const id=response.data.user._id;
       localStorage.setItem('token',response.data.token);
  
      
      if (response.data.user.role === 'Manufacturer') {
        navigate(`/manufacturer/${id}`);
      } else if(response.data.user.role === 'Transporter') {
        navigate(`/transporter/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={logincss.loginpage}>
      
      <form onSubmit={handleLogin} className={logincss.loginform}>
      <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={logincss.username}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={logincss.password}
        />
        <button type="submit" class={logincss.btn}>Login</button>
        <Link to="/register">Don't have an account?Click to register</Link>
      </form>
      
    </div>
  );
};

export default Login;
