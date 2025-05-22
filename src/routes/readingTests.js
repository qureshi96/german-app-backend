const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ReadingTest = require('../models/ReadingTest');

// Get all reading tests
router.get('/', async (req, res) => {
  try {
    const tests = await ReadingTest.find().lean();
    if (tests.length === 0) {
      return res.status(404).json({ message: 'No reading tests found' });
    }
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reading tests by level
router.get('/level/:level', async (req, res) => {
  try {
    const tests = await ReadingTest.aggregate([
      { $match: { level: req.params.level } },
      { $sample: { size: 1 } }
    ]);

    if (tests.length === 0) {
      return res.status(404).json({ 
        message: `No reading tests found for level ${req.params.level}` 
      });
    }
    res.json(tests[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single reading test
router.get('/:id', async (req, res) => {
  try {
    const test = await ReadingTest.findById(req.params.id).lean();
    if (!test) {
      return res.status(404).json({ message: 'Reading test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new reading test
router.post('/', async (req, res) => {
  try {
    const test = new ReadingTest({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    const newTest = await test.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add multiple reading tests
router.post('/batch', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Request body must be an array of tests' });
    }

    const tests = req.body.map(test => ({
      _id: new mongoose.Types.ObjectId(),
      level: test.level,
      title: test.title,
      content: test.content,
      true_false_statements: test.true_false_statements,
      multiple_choice_questions: test.multiple_choice_questions
    }));

    const savedTests = await ReadingTest.insertMany(tests);
    res.status(201).json(savedTests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;