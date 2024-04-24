import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PeopleList from './components/PeopleList';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  const [signups, setSignups] = useState([]);
  const [view, setView] = useState('login'); // default view 'login'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/signups');
      setSignups(response.data);
    } catch (error) {
      console.error('Error fetching signups: ', error);
    }
  };

  //switching between signup and login 
  const toggleView = () => {
    setView(view === 'signup' ? 'login' : 'signup');
  };

  //login
  const handleLoginSuccess = () => {
    console.log('Login successful');
    setIsLoggedIn(true); // Set isLoggedIn to true when login is successful
    setView('peopleList'); // Set view to 'peopleList' to hide the login form and signup button
  };

  //editing a user
  const handleEdit = async (userId, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/signup/${userId}`, updatedData);
      //fetch updated signups data
      fetchSignups();
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  //deleting a user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/signup/${userId}`);
      //update the signups state to reflect the deletion
      setSignups(signups.filter(user => user._id !== userId));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  console.log('isLoggedIn:', isLoggedIn);

  return (
    <div>
      {view === 'login' && !isLoggedIn && (
        <Login toggleView={toggleView} onLoginSuccess={handleLoginSuccess} />
      )}
      {view === 'signup' && !isLoggedIn && (
        <Signup toggleView={toggleView} />
      )}
      {isLoggedIn && <PeopleList signups={signups} handleEdit={handleEdit} handleDelete={handleDelete} fetchSignups={fetchSignups} />}
    </div>
  );
};

export default App;
