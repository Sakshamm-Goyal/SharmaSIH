const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to database before starting server
const startServer = async () => {
  try {
    await connectDB();
    
    // Routes
    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/career-path', require('./routes/careerPathRoutes'));
    app.use('/api/modules', require('./routes/moduleRoutes'));
    app.use('/api/internships', require('./routes/internships'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
