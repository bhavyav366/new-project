// authControllers.js

// Import necessary modules or models
const AuthUser = require('../models/Authuser');
const Signup = require('../models/Authuser');


const bcrypt = require('bcrypt');

// Handle user signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new AuthUser({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch users
exports.getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await Authuser.find({}, { password: 0 }); // Exclude password field

    // Check if users are found
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Send users as response
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSignups = async (req, res) => {
    try {
        const signups = await Signup.find();
        res.status(200).json(signups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};