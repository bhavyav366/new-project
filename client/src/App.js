import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddForm from './components/AddForm';
import UserList from './components/UserList';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [view, setView] = useState('signup'); // Manage the current view (signup or login)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users: ', error);
    }
  };

  const editUser = (userData) => {
    setEditData(userData); // Set the edit data
  };

  // Function to handle switching between signup and login views
  const toggleView = () => {
    setView(view === 'signup' ? 'login' : 'signup');
  };

  return (
    <div>
      {view === 'signup' ? (
        <Signup />
      ) : (
        <Login />
      )}
      <button onClick={toggleView}>
        {view === 'signup' ? 'Switch to Login' : 'Switch to Signup'}
      </button>
      <AddForm fetchUsers={fetchUsers} editData={editData} />
      <UserList users={users} editUser={editUser} />
    </div>
  );
};

export default App;
