const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Signup route
router.post('/signup', authControllers.signup);

// User login route
router.post('/login', authControllers.login);

// Admin login route
router.post('/admin/login', authControllers.adminLogin); // Create a new controller for admin login

// Get all signups route
router.get('/signups', authControllers.getSignups);

// Update signup route
router.put('/signups/:id', authControllers.editSignup);

// Delete signup route
router.delete('/signups/:id', authControllers.deleteSignup);

module.exports = router;
