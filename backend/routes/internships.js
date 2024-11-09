const express = require('express');
const router = express.Router();
const InternshipOpportunity = require('../models/InternshipOpportunity');

// Get all internship opportunities
router.get('/', async (req, res) => {
  try {
    const internships = await InternshipOpportunity.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
