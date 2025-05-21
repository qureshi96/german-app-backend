const mongoose = require('mongoose');

const vocabTestSchema = new mongoose.Schema({
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
  isWordOptions: {
    type: Boolean,
    required: true
  }
}, {
  collection: 'vocab_tests',
  timestamps: true
});

module.exports = mongoose.model('VocabTest', vocabTestSchema, 'vocab_tests');