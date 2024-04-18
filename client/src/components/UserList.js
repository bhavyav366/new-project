import React from 'react';
import '../styles.css';

const UserList = ({ users, editUser, deleteUser }) => {
  return (
    <div className="table-wrapper">
      <h2>User List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
                <td>{user.pincode}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)} className="delete-button">
                    Delete
                  </button>
                  
                  <button onClick={() => editUser(user)} className="edit-button" style={{ marginLeft: '10px' }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
