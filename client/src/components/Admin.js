import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import '../formStyles.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    email: '', // Default email is empty
    password: '' // Default password is empty
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
        onLoginSuccess(true); // Pass true to indicate admin login
        // Redirect to the home page
        navigate('/'); // Assuming '/' is the home page route
        // Display success alert
        alert('Admin login successful');
        // Clear form fields
        setFormData({
          email: '', // Reset email to empty
          password: '' // Reset password to empty
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
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-footer">
          <button className="submit-button" type="submit">Login</button>
        </div>
      </form>
      <div className="signup-text">Not an Admin?</div>
      <Link to="/login" className="switch-to-signup-button">Go to User Login</Link>
    </div>
  );
};

export default AdminLogin;
