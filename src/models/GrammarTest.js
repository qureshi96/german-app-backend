const mongoose = require('mongoose');

const grammarTestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: {
    type: String,
    enum: ['Tenses', 'Prepositions', 'Conjunctions', 'Cases'],
    required: true
  },
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
  }
}, {
  collection: 'grammar_tests',
  timestamps: true
});

module.exports = mongoose.model('GrammarTest', grammarTestSchema, 'grammar_tests');