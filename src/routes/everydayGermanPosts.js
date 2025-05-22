const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const EverydayGermanPost = require('../models/EverydayGermanPost');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await EverydayGermanPost.find().lean();
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No everyday German posts found' });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get posts by level
router.get('/level/:level', async (req, res) => {
  try {
    const posts = await EverydayGermanPost.find({ level: req.params.level }).lean();
    if (posts.length === 0) {
      return res.status(404).json({ message: `No posts found for level ${req.params.level}` });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const post = await EverydayGermanPost.findById(req.params.id).lean();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const post = new EverydayGermanPost({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;