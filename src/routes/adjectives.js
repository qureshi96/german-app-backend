const express = require('express');
const router = express.Router();
const Adjective = require('../models/Adjective');

// Get all adjectives
router.get('/', async (req, res) => {
  try {
    const adjectives = await Adjective.find().lean();
    console.log('Total adjectives found:', adjectives.length);
    
    if (adjectives.length === 0) {
      return res.status(404).json({ 
        message: 'No adjectives found in database'
      });
    }
    
    res.json(adjectives);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get list of adjective strings only
router.get('/list', async (req, res) => {
  try {
    const adjectives = await Adjective.find().select('adjective -_id').lean();
    const adjectiveList = adjectives.map(a => a.adjective);
    
    if (adjectiveList.length === 0) {
      return res.status(404).json({ 
        message: 'No adjectives found in database'
      });
    }
    
    res.json(adjectiveList);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;