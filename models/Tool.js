const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Tool', toolSchema);
