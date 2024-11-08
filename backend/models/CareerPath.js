const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
});

module.exports = mongoose.model('CareerPath', careerPathSchema);
