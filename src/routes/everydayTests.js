const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const EverydayTest = require('../models/EverydayTest');

// Get 10 random unique everyday test questions
router.get('/', async (req, res) => {
  try {
    const questions = await EverydayTest.aggregate([
      { $match: {} },  // Match all documents
      { $sample: { size: 10 } },  // Get 10 random documents
      { $group: {  // Group to ensure uniqueness
        _id: '$_id',
        question: { $first: '$question' },
        option1: { $first: '$option1' },
        option2: { $first: '$option2' },
        option3: { $first: '$option3' },
        option4: { $first: '$option4' },
        answer: { $first: '$answer' },
        explanation: { $first: '$explanation' }
      }}
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No everyday test questions found' });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  try {
    const question = new EverydayTest({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add multiple questions
router.post('/batch', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Request body must be an array of questions' });
    }

    const questions = req.body.map(question => ({
      _id: new mongoose.Types.ObjectId(),
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer,
      explanation: question.explanation || ''
    }));

    const savedQuestions = await EverydayTest.insertMany(questions);
    res.status(201).json(savedQuestions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;