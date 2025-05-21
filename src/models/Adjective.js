const mongoose = require('mongoose');

const adjectiveSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  adjective: {
    type: String,
    required: true
  },
  meaning: {
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
  collection: 'adjectives'
});

module.exports = mongoose.model('Adjective', adjectiveSchema, 'adjectives');