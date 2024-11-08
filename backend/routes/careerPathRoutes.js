const express = require('express');
const { getCareerPath, completeModule } = require('../controllers/careerPathController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', protect, getCareerPath);
router.post('/complete-module/:moduleId', protect, completeModule);

module.exports = router;
