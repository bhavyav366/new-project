
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PeopleList from './components/PeopleList'; // Rename UserList to PeopleList
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  const [signups, setSignups] = useState([]);
  const [view, setView] = useState('login'); // Set default view to 'login'

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

  // Function to handle switching between signup and login views
  const toggleView = () => {
    setView(view === 'signup' ? 'login' : 'signup');
  };

  return (
    <div>
      {view === 'login' ? (
        <div>
          <Login toggleView={toggleView} />
          <PeopleList signups={signups} /> {/* Render PeopleList only on the login page */}
        </div>
      ) : (
        <Signup toggleView={toggleView} />
      )}
    </div>
  );
};

export default App;