import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const AddForm = ({ fetchUsers, editData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    address: '',
    pincode: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        address: '',
        pincode: ''
      });
    }
  }, [editData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await axios.put(`http://localhost:5000/api/users/${editData._id}`, formData);
        alert('User data updated');
      } else {
        await axios.post('http://localhost:5000/api/users', formData);
        alert('User added successfully');
      }
      fetchUsers();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        address: '',
        pincode: ''
      });
    } catch (error) {
      console.error('Failed to add/update user: ', error);
      alert('Failed to add/update user');
    }
  };

  return (
    <div className="input-container">
      <h2>{editData ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Pincode:</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">{editData ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default AddForm;



