const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const GrammarTest = require('../models/GrammarTest');

// Get all grammar test questions
router.get('/', async (req, res) => {
  try {
    const questions = await GrammarTest.find().lean();
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No grammar test questions found' });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get questions by category
// Get 10 random questions by category
router.get('/category/:category', async (req, res) => {
  try {
    const questions = await GrammarTest.aggregate([
      { $match: { category: req.params.category } },
      { $sample: { size: 10 } }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ 
        message: `No questions found for category ${req.params.category}` 
      });
    }
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  try {
    const question = new GrammarTest({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add multiple grammar test questions
router.post('/batch', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Request body must be an array of questions' });
    }

    const questions = req.body.map(question => ({
      _id: new mongoose.Types.ObjectId(),
      category: question.category,
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer
    }));

    const savedQuestions = await GrammarTest.insertMany(questions);
    res.status(201).json(savedQuestions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;