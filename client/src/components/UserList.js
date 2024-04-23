import React from 'react';
import '../styles.css';

const SignupList = ({ signups }) => {
  return (
    <div className="table-wrapper">
      <h2>Signup List</h2>
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
            </tr>
          </thead>
          <tbody>
            {signups.map(signup => (
              <tr key={signup._id}>
                <td>{signup.firstName}</td>
                <td>{signup.lastName}</td>
                <td>{signup.email}</td>
                <td>{signup.contact}</td>
                <td>{signup.address}</td>
                <td>{signup.pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignupList;
