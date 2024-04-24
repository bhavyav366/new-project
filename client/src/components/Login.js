import React, { useState } from 'react';
import '../formStyles.css'; 

const Login = ({ toggleView, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // onLoginSuccess  from App.js
        onLoginSuccess();
        // success alert
        alert('Login successful');
        // Clear fields
        setFormData({
          email: '',
          password: ''
        });
      } else {
        // Handle login failure
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="input-container">
      <div className="form-header">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-footer">
          <button className="submit-button" type="submit">Login</button>
        </div>
      </form>
      <div className="signup-text">Not an Existing User?</div>
      <button className="switch-to-signup-button" type="button" onClick={toggleView}>Signup</button>
    </div>
  );
};

export default Login;
