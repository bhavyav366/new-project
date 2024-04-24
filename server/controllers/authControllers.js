const AuthUser = require('../models/Authuser');

const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new AuthUser({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

exports.getSignups = async (req, res) => {
  try {
    const signups = await AuthUser.find();
    res.status(200).json(signups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.editSignup = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSignup = req.body;

    const updatedUser = await AuthUser.findByIdAndUpdate(id, updatedSignup, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Signup updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSignup = async (req, res) => {
  try {
    const { id } = req.params;

    await AuthUser.findByIdAndUpdate(id, { $set: { status: 'deleted' } });

    res.status(200).json({ message: 'Signup deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
