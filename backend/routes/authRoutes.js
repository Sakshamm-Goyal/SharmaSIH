const express = require('express');
const { registerUser, loginUser, createOrUpdateGoogleUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-auth', createOrUpdateGoogleUser);

module.exports = router;
