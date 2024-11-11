const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  careerPaths: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CareerPath' }], 
  completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
  community: { type: String, default: '' },
  eligibilityStatus: [
    {
      careerPath: { type: mongoose.Schema.Types.ObjectId, ref: 'CareerPath' },
      isEligible: { type: Boolean, default: false }
    }
  ],
  internships: [
    {
      internship: { type: mongoose.Schema.Types.ObjectId, ref: 'InternshipOpportunity' },
      status: { type: String, enum: ['applied', 'accepted', 'completed'], default: 'applied' }, 
      dateApplied: { type: Date, default: Date.now }, 
    },
  ], 
});

module.exports = mongoose.model('User', userSchema);
