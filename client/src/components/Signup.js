import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../formStyles.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      // Check if user is created successfully
      if (response.ok) {
        // Display success alert
        alert('User created successfully');
        // Clear form fields
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
      } else {
        // Handle error
        alert('Failed to create user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="input-container">
      <div className="form-header">
        <h2>Signup</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-footer">
          <button className="submit-button" type="submit">Signup</button>
        </div>
      </form>
      <div className="signup-text">Already have an account? </div>
      <Link className="switch-to-login-button" to="/login">Login</Link>
    </div>
  );
};

export default Signup;
