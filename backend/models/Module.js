const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  videoUrl: { type: String },
  vrLink: { type: String },
  quizLink: { type: String },
  
});

module.exports = mongoose.model('Module', moduleSchema);
