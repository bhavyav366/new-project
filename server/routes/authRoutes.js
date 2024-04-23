// authRoutes.js

const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Signup route
router.post('/signup', authControllers.signup);

// Login route
router.post('/login', authControllers.login);

router.get('/signups', authControllers.getSignups);

module.exports = router;
