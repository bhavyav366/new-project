import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import '../formStyles.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    email: 'admin@gmail.com', // Set default admin email
    password: 'admin123' // Set default admin password
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // onLoginSuccess from App.js
        onLoginSuccess();
        // Navigate to the admin dashboard
        navigate('/admin/dashboard');
        // Display success alert
        alert('Admin login successful');
        // Clear form fields
        setFormData({
          email: '',
          password: ''
        });
      } else {
        // Handle login failure
        alert('Admin login failed. Please check your credentials and try again.');
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
        <h2>Admin Login</h2>
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
      <div className="signup-text">Not an Admin?</div>
      <Link to="/" className="switch-to-signup-button">Go to User Login</Link>
    </div>
  );
};

export default AdminLogin;
