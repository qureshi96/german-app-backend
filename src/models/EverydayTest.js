const mongoose = require('mongoose');

const everydayTestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: {
    type: String,
    required: true
  },
  option1: {
    type: String,
    required: true
  },
  option2: {
    type: String,
    required: true
  },
  option3: {
    type: String,
    required: true
  },
  option4: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: false
  }
}, {
  collection: 'everyday_tests',
  timestamps: true
});

module.exports = mongoose.model('EverydayTest', everydayTestSchema, 'everyday_tests');