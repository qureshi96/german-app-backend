const mongoose = require('mongoose');

const nounSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  noun: {
    type: String,
    required: true
  },
  plural: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  level: {
    type: String,
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
  collection: 'nouns'
});

module.exports = mongoose.model('Noun', nounSchema, 'nouns');