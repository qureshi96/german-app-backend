const mongoose = require('mongoose');

const adverbSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  adverb: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  }
}, {
  collection: 'adverbs'
});

module.exports = mongoose.model('Adverb', adverbSchema, 'adverbs');