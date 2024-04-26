import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import Signup from './components/Signup';
import Login from './components/Login';
import AdminLogin from './components/Admin.js'; // Import AdminLogin component

const App = () => {
  const [signups, setSignups] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('User Logged Out!')
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/signups/${userId}`);
      fetchSignups();
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting user. Please try again later.');
    }
  };

  return (
    <Router>
      <div>
        {isLoggedIn && (
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/peopleList">List</Link></li>
              <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </nav>
        )}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/peopleList" element={isLoggedIn ? <PeopleList signups={signups} fetchSignups={fetchSignups} handleDelete={handleDelete} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} /> {/* Define admin route */}
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h1>Welcome to Home Page</h1>
    {/* Other content for the home page */}
  </div>
);

export default App;
