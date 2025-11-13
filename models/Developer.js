const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },              // 1
  email: { type: String, required: true, unique: true }, // 2
  skills: [String],                                     // 3
  bio: String,                                          // 4
  location: String,                                     // 5
  github: String,                                       // 6
  website: String,                                      // 7
  createdAt: { type: Date, default: Date.now }          // 8 
});

module.exports = mongoose.model('Developer', developerSchema);