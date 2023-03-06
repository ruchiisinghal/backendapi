const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Create user route
router.post('/', UserController.createUser);

module.exports = router;
