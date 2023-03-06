const express = require('express');
const router = express.Router();
const User = require('../models/user')
const AuthController = require('../controllers/authController');

// Login route
router.post('/login', AuthController.login);
//signup route
router.post('/signup', AuthController.signup);
// Verify OTP route
router.post('/verify', AuthController.verifyOTP);

//jwt token verify
router.get('/jwt-test',middleware.verify,(req,res)=>{
    res.status(200).json
})

module.exports = router;
