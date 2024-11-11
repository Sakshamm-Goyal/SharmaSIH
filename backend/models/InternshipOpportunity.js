const mongoose = require('mongoose');

const internshipOpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  duration: { type: String }, // e.g., "3 months"
  applicationDeadline: { type: Date },
  location: { type: String }, // e.g., "Remote" or specific location
  organization: { type: mongoose.Schema.Types.ObjectId},
  // organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
});

module.exports = mongoose.model('InternshipOpportunity', internshipOpportunitySchema);
