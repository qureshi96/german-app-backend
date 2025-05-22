const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DonePost = require('../models/DonePost');

// Get all done posts for a user
router.get('/:userId', async (req, res) => {
  try {
    const posts = await DonePost.find({ userId: req.params.userId }).lean();
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No done posts found for this user' });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark a post as done
router.post('/', async (req, res) => {
  try {
    const donePost = new DonePost({
      _id: new mongoose.Types.ObjectId(),
      userId: req.body.userId,
      postId: req.body.postId,
      type: req.body.type
    });
    
    const savedPost = await donePost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Post already marked as done' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete a done post
router.delete('/:id', async (req, res) => {
  try {
    const result = await DonePost.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Done post removed', removedPost: result });
    } else {
      res.status(404).json({ message: 'Done post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;