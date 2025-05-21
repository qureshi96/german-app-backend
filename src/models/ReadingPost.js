const mongoose = require('mongoose');

const readingPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  questions: {
    type: String,
    required: true
  },
  answers: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  collection: 'reading_posts',
  timestamps: true
});

module.exports = mongoose.model('ReadingPost', readingPostSchema, 'reading_posts');