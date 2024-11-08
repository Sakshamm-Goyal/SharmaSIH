const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workshops: [{ title: String, date: Date }],
  internshipOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InternshipOpportunity' }],
});

module.exports = mongoose.model('Organization', organizationSchema);
