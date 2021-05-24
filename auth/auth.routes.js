const express = require('express');
const router = express.Router();
const httpHandlerAuth = require('./auth.http');

// route of register
router.route('/register')
.post(httpHandlerAuth.registerUser);

// route of login
router.route('/login')
.post(httpHandlerAuth.loginUser);

module.exports = router;