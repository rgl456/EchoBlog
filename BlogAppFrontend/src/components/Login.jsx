import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev, [e.target.id]:e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await login(formData);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("email",formData.email);
      navigate('/');
    } catch(err){
      alert("Login failed! " + err.response?.data?.message || "Try again");
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email"  value={formData.email} onChange={handleChange} placeholder="Enter your email" autoComplete='email'/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete='password'/>
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="invite-text">
          Don't have an account?{' '}
          <button
            type="button"
            className="invite-link"
            onClick={()=>navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;