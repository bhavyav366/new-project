const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const userRoutes = require('./routes/users'); // Import user routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const db = require('./config/db').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Default message
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Stack CRUD App!');
});

// Authentication routes
app.use('/api/auth', authRoutes); // Use authentication routes

// User routes
app.use('/api/users', userRoutes); // Use user routes

// Port setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
