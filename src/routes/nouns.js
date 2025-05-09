const express = require('express');
const router = express.Router();
const Noun = require('../models/Noun');

// Get all nouns
router.get('/', async (req, res) => {
  try {
    const nouns = await Noun.find().select('-url').lean();
    console.log('Total nouns found:', nouns.length);
    
    if (nouns.length === 0) {
      return res.status(404).json({ 
        message: 'No nouns found in database',
        databaseStatus: 'Connected but empty'
      });
    }
    
    res.json(nouns);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ 
      message: error.message,
      databaseStatus: 'Error querying database'
    });
  }
});
// Get list of noun strings only
router.get('/list', async (req, res) => {
    try {
      const nouns = await Noun.find().select('noun -_id').lean();
      const nounList = nouns.map(n => n.noun);
      
      if (nounList.length === 0) {
        return res.status(404).json({ 
          message: 'No nouns found in database'
        });
      }
      
      res.json(nounList);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: error.message });
    }
  });
// Get a single noun
router.get('/:noun', async (req, res) => {
  try {
    console.log('Searching for noun:', req.params.noun);
    
    const noun = await Noun.findOne({ noun: req.params.noun }).select('-url').lean();
    console.log('Database query result:', noun);
    
    if (noun) {
      res.json(noun);
    } else {
      res.status(404).json({ 
        message: 'Noun not found',
        searchedFor: req.params.noun,
        databaseStatus: 'Connected but noun not found'
      });
    }
  } catch (error) {
    console.error('Error finding noun:', error);
    res.status(500).json({ 
      message: error.message,
      databaseStatus: 'Error querying database'
    });
  }
});



module.exports = router;