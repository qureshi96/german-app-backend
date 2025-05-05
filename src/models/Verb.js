const mongoose = require('mongoose');

const conjugationSchema = new mongoose.Schema({
  singular: {
    ich: String,
    du: String,
    er: String
  },
  plural: {
    wir: String,
    ihr: String,
    sie: String
  }
});

const verbSchema = new mongoose.Schema({
  _id: String,
  verb: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  conjugations: {
    type: Object,
    required: true
  },
  level: {
    type: String,
    required: true
  }
}, {
  _id: false,
  collection: 'verbs'
});

module.exports = mongoose.model('Verb', verbSchema, 'verbs');