const mongoose = require('mongoose');

const donePostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['grammarpost', 'readingpost', 'everydaypost'],
    required: true
  }
}, {
  collection: 'done_posts',
  timestamps: true
});

// Compound index to prevent duplicate done posts for a user
donePostSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = mongoose.model('DonePost', donePostSchema, 'done_posts');