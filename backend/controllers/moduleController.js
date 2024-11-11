const User = require('../models/User');
const CareerPath = require('../models/CareerPath');
const Module = require('../models/Module');

// Fetch modules based on the user's career paths
const getModulesForUser = async (req, res) => {
  try {
    // Retrieve the authenticated user
    const user = await User.findById(req.user.id).populate({
      path: 'careerPaths',
      populate: { path: 'modules' },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Collect all modules from the user's career paths
    const modules = user.careerPaths.reduce((acc, careerPath) => {
      return acc.concat(careerPath.modules);
    }, []);

    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching modules', error });
  }
};

// Get a single module by its ID
const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);

    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching module', error });
  }
};

module.exports = { getModulesForUser, getModuleById };
