import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import '../css/Signup.css';
import { register } from '../services/authService';

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await register(formData);
      alert("Signup successful! Please login.");
      navigate('/login');
    }catch(err){
      alert("Signup failed! " + err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" autoComplete="name"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" autoComplete="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete="new-password"/>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <p className="invite-text">
          Already have an account?{' '}
          <button
            type="button"
            className="invite-link"
            onClick={()=>navigate('/login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;