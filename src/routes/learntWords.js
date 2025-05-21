const express = require('express');
const router = express.Router();
const LearntWord = require('../models/LearntWord');

// Get all learnt words for a user
router.get('/:userId', async (req, res) => {
  try {
    const words = await LearntWord.find({ userId: req.params.userId }).lean();
    if (words.length === 0) {
      return res.status(404).json({ message: 'No learnt words found for this user' });
    }
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a word to learnt words (POST to root path)
router.post('/', async (req, res) => {
  try {
    console.log('Received POST request with body:', req.body);
    
    if (!req.body.userId || !req.body.wordId || !req.body.word || !req.body.meaning || !req.body.type) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['userId', 'wordId', 'word', 'meaning', 'type'],
        received: req.body 
      });
    }

    const learntWord = new LearntWord({
      userId: req.body.userId,
      wordId: req.body.wordId,
      word: req.body.word,
      meaning: req.body.meaning,
      type: req.body.type,
      example_de: req.body.example_de || '',
      example_en: req.body.example_en || ''
    });

    const savedWord = await learntWord.save();
    console.log('Word saved successfully:', savedWord);
    res.status(201).json(savedWord);
  } catch (error) {
    console.error('Error saving word:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'This word is already in your learnt list' });
    } else {
      res.status(400).json({ 
        message: error.message,
        details: error.errors 
      });
    }
  }
});

// Delete a learnt word
router.delete('/:wordId', async (req, res) => {
  try {
    const result = await LearntWord.findOneAndDelete({ _id: req.params.wordId });
    if (result) {
      res.json({ message: 'Word removed from learnt list', removedWord: result });
    } else {
      res.status(404).json({ message: 'Word not found in learnt list' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;