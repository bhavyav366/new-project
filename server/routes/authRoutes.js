// authRoutes.js

const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Signup route
router.post('/signup', authControllers.signup);

// Login route
router.post('/login', authControllers.login);

// Get all signups route
router.get('/signups', authControllers.getSignups);

// Edit signup route
router.put('/signup/:id', authControllers.editSignup);

// Delete signup route
router.delete('/signup/:id', authControllers.deleteSignup);

module.exports = router;
