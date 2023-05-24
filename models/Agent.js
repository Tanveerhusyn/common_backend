const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ['available', 'busy'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Agent', AgentSchema);
