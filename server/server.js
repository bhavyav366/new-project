const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/users'); 
const adminRoutes = require('./routes/authRoutes'); // Import adminRoutes

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
app.use('/api/auth', authRoutes); 

// User routes
app.use('/api/users', userRoutes);

// Admin routes
app.use('/api/admin', adminRoutes); 

// Port setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
