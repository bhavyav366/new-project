

const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authControllers');

router.post('/', signup);

module.exports = router;
