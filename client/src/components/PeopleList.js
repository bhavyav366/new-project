import React from 'react';

const PeopleList = ({ signups }) => {
  return (
    <div>
      <h2>People List</h2>
      <ul>
        {signups.map(signup => (
          <li key={signup._id}>
            <p>First Name: {signup.firstName}</p>
            <p>Last Name: {signup.lastName}</p>
            <p>Email: {signup.email}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
