const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'User registration failed', error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'User login failed', error });
  }
};

const createOrUpdateGoogleUser = async (req, res) => {
  const { uid, email, userName, photoURL, createdAt } = req.body;
  
  try {
    // Check if user exists
    let user = await User.findOne({ uid });
    
    if (user) {
      // Update existing user
      user.name = userName;
      user.email = email;
      user.photoURL = photoURL;
      await user.save();
      res.json(user);
    } else {
      // Create new user
      user = await User.create({
        uid,
        name: userName,
        email,
        photoURL,
        createdAt,
        password: 'GOOGLE_AUTH' // Since Google Auth doesn't need password
      });
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error creating/updating Google user', error });
  }
};

module.exports = { registerUser, loginUser, createOrUpdateGoogleUser };
