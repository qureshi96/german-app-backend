const mongoose = require('mongoose');

const everydayGermanPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  collection: 'everyday_german_posts',
  timestamps: true
});

module.exports = mongoose.model('EverydayGermanPost', everydayGermanPostSchema, 'everyday_german_posts');