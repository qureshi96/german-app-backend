const express = require('express');
const router = express.Router();
const ReadingPost = require('../models/ReadingPost');

// Get all reading posts
router.get('/', async (req, res) => {
  try {
    const posts = await ReadingPost.find().lean();
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No reading posts found' });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reading posts by level
router.get('/level/:level', async (req, res) => {
  try {
    const posts = await ReadingPost.find({ level: req.params.level }).lean();
    if (posts.length === 0) {
      return res.status(404).json({ 
        message: `No reading posts found for level ${req.params.level}` 
      });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single reading post
router.get('/:id', async (req, res) => {
  try {
    const post = await ReadingPost.findById(req.params.id).lean();
    if (!post) {
      return res.status(404).json({ message: 'Reading post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new reading post
router.post('/', async (req, res) => {
  try {
    const post = new ReadingPost(req.body);
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;