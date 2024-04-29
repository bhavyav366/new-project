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
  const [isAdmin, setIsAdmin] = useState(false);

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

  const handleLoginSuccess = (admin) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    alert('User Logged Out!')
  };

  return (
    <Router>
      <div>
        {/* Render Navbar only if user is admin */}
        {isLoggedIn && isAdmin && (
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/peopleList">List</Link></li>
              <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </nav>
        )}
        {/* Routes based on user type */}
        <Routes>
          {/* Route for regular user */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          {/* Route for admin */}
          <Route path="/admin" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
          {/* Route for displaying PeopleList for regular user */}
          <Route path="/peopleList" element={isLoggedIn ? <PeopleList signups={signups} fetchSignups={fetchSignups} /> : <Navigate to="/login" />} />
          {/* Route for displaying welcome message after regular user login */}
          <Route path="/welcome" element={<WelcomeMessage onLogout={handleLogout} />} />
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

const WelcomeMessage = ({ onLogout }) => (
  <div className="welcome-container">
    <h1>Welcome to Login Page</h1>
    {/* Logout button */}
    <div className="logout-button">
      <Link className="logg-button" to="/login" onClick={onLogout}>
        Logout
      </Link>
    </div>
  </div>
);

export default App;
