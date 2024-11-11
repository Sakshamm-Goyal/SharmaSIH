const express = require('express');
const { getModulesForUser, getModuleById } = require('../controllers/moduleController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have middleware for JWT auth

const router = express.Router();

// Route to get modules based on the user's career path
router.get('/user-modules', authMiddleware, getModulesForUser);

// Route to get a specific module by ID
router.get('/:moduleId', authMiddleware, getModuleById);

module.exports = router;
