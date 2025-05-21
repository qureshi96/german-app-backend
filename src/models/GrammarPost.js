const mongoose = require('mongoose');

const grammarPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
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
  },
  content: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  }
}, {
  collection: 'grammar_posts',
  timestamps: true
});

module.exports = mongoose.model('GrammarPost', grammarPostSchema, 'grammar_posts');