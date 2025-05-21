const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const GrammarPost = require('../models/GrammarPost');

// Get all grammar posts
router.get('/', async (req, res) => {
  try {
    const posts = await GrammarPost.find().lean();
    console.log('Total grammar posts found:', posts.length);
    
    if (posts.length === 0) {
      return res.status(404).json({ 
        message: 'No grammar posts found'
      });
    }
    
    res.json(posts);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single grammar post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await GrammarPost.findById(req.params.id).lean();
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ 
        message: 'Grammar post not found'
      });
    }
  } catch (error) {
    console.error('Error finding post:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get grammar posts by level
router.get('/level/:level', async (req, res) => {
  try {
    const posts = await GrammarPost.find({ level: req.params.level }).lean();
    console.log('Grammar posts found for level:', req.params.level, posts.length);
    
    if (posts.length === 0) {
      return res.status(404).json({ 
        message: `No grammar posts found for level ${req.params.level}`
      });
    }
    
    res.json(posts);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new grammar post
router.post('/', async (req, res) => {
  try {
    const post = new GrammarPost({
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