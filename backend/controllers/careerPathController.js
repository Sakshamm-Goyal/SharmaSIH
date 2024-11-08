const User = require('../models/User');
const Module = require('../models/Module');
const CareerPath = require('../models/CareerPath');

const getCareerPath = async (req, res) => {
  try {
    const careerPath = await CareerPath.findById(req.params.id).populate('modules');
    res.json(careerPath);
  } catch (error) {
    res.status(404).json({ message: 'Career Path not found', error });
  }
};

const completeModule = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const module = await Module.findById(req.params.moduleId);
    if (user && module && !user.completedModules.includes(module._id)) {
      user.completedModules.push(module._id);
      await user.save();
      res.json({ message: 'Module completed' });
    } else {
      res.status(400).json({ message: 'Module already completed or not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Could not complete module', error });
  }
};

module.exports = { getCareerPath, completeModule };
