const mongoose = require('mongoose');

const trueFalseSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true
  },
  correct_answer: {
    type: Boolean,
    required: true
  }
});

const multipleChoiceSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correct_answer: {
    type: String,
    required: true
  }
});

const readingTestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  level: {
    type: String,
    enum: ['A2', 'B1'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  true_false_statements: [trueFalseSchema],
  multiple_choice_questions: [multipleChoiceSchema]
}, {
  collection: 'reading_tests',
  timestamps: true
});

module.exports = mongoose.model('ReadingTest', readingTestSchema, 'reading_tests');