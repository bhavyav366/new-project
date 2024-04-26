import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const PeopleList = ({ signups, handleDelete, fetchSignups }) => {
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const navigate = useNavigate();

  const handleEditClick = (userId, fields) => {
    setEditableUserId(userId);
    setEditedFields({
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email
    });
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/signups/${editableUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFields),
      });

      if (response.ok) {
        fetchSignups();
        alert('User updated successfully');
        setEditableUserId(null);
        setEditedFields({});
      } else {
        alert('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleCancelClick = () => {
    setEditableUserId(null);
    setEditedFields({});
  };

  const handleInputChange = (event, field) => {
    setEditedFields({
      ...editedFields,
      [field]: event.target.value
    });
  };

  const isFieldEdited = (userId, field) => {
    return editedFields.hasOwnProperty(field) && editedFields[field] !== signups.find(user => user._id === userId)[field];
  };

  const handleLogout = () => {
    navigate('/login');
    alert('User Logged Out!')
  };

  return (
    <div className="table-wrapper">
      <h2>People List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {signups.map(signup => (
              <tr key={signup._id}>
                <td>
                  {editableUserId === signup._id ? (
                    <input
                      type="text"
                      value={isFieldEdited(signup._id, 'firstName') ? editedFields['firstName'] : signup.firstName}
                      onChange={(e) => handleInputChange(e, 'firstName')}
                    />
                  ) : (
                    signup.firstName
                  )}
                </td>
                <td>
                  {editableUserId === signup._id ? (
                    <input
                      type="text"
                      value={isFieldEdited(signup._id, 'lastName') ? editedFields['lastName'] : signup.lastName}
                      onChange={(e) => handleInputChange(e, 'lastName')}
                    />
                  ) : (
                    signup.lastName
                  )}
                </td>
                <td>
                  {editableUserId === signup._id ? (
                    <input
                      type="text"
                      value={isFieldEdited(signup._id, 'email') ? editedFields['email'] : signup.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                    />
                  ) : (
                    signup.email
                  )}
                </td>
                <td>
                  {editableUserId === signup._id ? (
                    <>
                      <button className="update-button" onClick={handleUpdateClick}>Update</button>
                      <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <button className="edit-button" onClick={() => handleEditClick(signup._id, { firstName: signup.firstName, lastName: signup.lastName, email: signup.email })}>Edit</button>
                  )}
                  <button className="delete-button" onClick={() => handleDelete(signup._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeopleList;
