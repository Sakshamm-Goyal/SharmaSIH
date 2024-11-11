const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const moduleRoutes = require('./routes/moduleRoutes'); // Add this line

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/career-path', require('./routes/careerPathRoutes'));
app.use('/api/modules', moduleRoutes); // Register module routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const internshipRoutes = require('./routes/internships');
app.use('/api/internships', internshipRoutes);

const Organization = require('./models/Organization');
