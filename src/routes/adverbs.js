const express = require('express');
const router = express.Router();
const Adverb = require('../models/Adverb');

// Get all adverbs
router.get('/', async (req, res) => {
  try {
    const adverbs = await Adverb.find().lean();
    console.log('Total adverbs found:', adverbs.length);
    
    if (adverbs.length === 0) {
      return res.status(404).json({ 
        message: 'No adverbs found in database'
      });
    }
    
    res.json(adverbs);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get list of adverb strings only
router.get('/list', async (req, res) => {
  try {
    const adverbs = await Adverb.find().select('adverb -_id').lean();
    const adverbList = adverbs.map(a => a.adverb);
    
    if (adverbList.length === 0) {
      return res.status(404).json({ 
        message: 'No adverbs found in database'
      });
    }
    
    res.json(adverbList);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;