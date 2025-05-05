const express = require('express');
const router = express.Router();
const Verb = require('../models/Verb');

// Get all verbs
router.get('/', async (req, res) => {
  try {
    const verbs = await Verb.find().lean();
    console.log('Total verbs found:', verbs.length);
    
    if (verbs.length === 0) {
      return res.status(404).json({ 
        message: 'No verbs found in database',
        databaseStatus: 'Connected but empty'
      });
    }
    
    res.json(verbs);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ 
      message: error.message,
      databaseStatus: 'Error querying database'
    });
  }
});

// Get a single verb
router.get('/:verb', async (req, res) => {
  try {
    console.log('Searching for verb:', req.params.verb);
    
    const verb = await Verb.findOne({ verb: req.params.verb }).lean();
    console.log('Database query result:', verb);
    
    if (verb) {
      res.json(verb);
    } else {
      res.status(404).json({ 
        message: 'Verb not found',
        searchedFor: req.params.verb,
        databaseStatus: 'Connected but verb not found'
      });
    }
  } catch (error) {
    console.error('Error finding verb:', error);
    res.status(500).json({ 
      message: error.message,
      databaseStatus: 'Error querying database'
    });
  }
});

// Create a new verb
router.post('/', async (req, res) => {
  const verb = new Verb(req.body);
  try {
    const newVerb = await verb.save();
    res.status(201).json(newVerb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;