const mongoose = require('mongoose');

const learntWordSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  wordId: { 
    type: String, 
    required: true 
  },
  word: { 
    type: String, 
    required: true 
  },
  meaning: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['noun', 'verb', 'adjective', 'adverb'], 
    required: true 
  },
  example_de: {
    type: String,
    required: false
  },
  example_en: {
    type: String,
    required: false
  }
}, {
  collection: 'learnt_words',
  timestamps: true
});

// Compound index to prevent duplicate learnt words for a user
learntWordSchema.index({ userId: 1, wordId: 1 }, { unique: true });

module.exports = mongoose.model('LearntWord', learntWordSchema, 'learnt_words');