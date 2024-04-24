import React, { useState } from 'react';
import '../styles.css';

const PeopleList = ({ signups, handleEdit, handleDelete, fetchSignups }) => {
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  const handleEditClick = (userId, fields) => {
    setEditableUserId(userId);
    setEditedFields({ ...fields });
  };

  const handleUpdateClick = async () => {
    try {
      // update the user data in the backend
      console.log('Updated fields:', editedFields);
      // After update, reset editable user ID and edited fields
      setEditableUserId(null);
      setEditedFields({});
      // Fetch updated signups data
      fetchSignups();
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
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
