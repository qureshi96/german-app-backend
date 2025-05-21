const express = require('express');
const router = express.Router();
const VocabTest = require('../models/VocabTest');
const LearntWord = require('../models/LearntWord');
const Verb = require('../models/Verb');
const Noun = require('../models/Noun');

// Helper function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Helper function to generate meaning options
const generateMeaningOptions = (correctMeaning, allWords) => {
  const wrongOptions = allWords
    .filter(word => word.meaning !== correctMeaning)
    .map(word => word.meaning.split(',')[0].trim());
  
  const randomWrongOptions = shuffleArray(wrongOptions).slice(0, 3);
  const allOptions = shuffleArray([correctMeaning, ...randomWrongOptions]);
  
  return {
    option1: allOptions[0],
    option2: allOptions[1],
    option3: allOptions[2],
    option4: allOptions[3],
    isWordOptions: false
  };
};

// Helper function to generate word options
const generateWordOptions = (correctWord, allWords) => {
  const wrongOptions = allWords
    .filter(word => (word.verb || word.noun) !== correctWord)
    .map(word => word.verb || word.noun);
  
  const randomWrongOptions = shuffleArray(wrongOptions).slice(0, 3);
  const allOptions = shuffleArray([correctWord, ...randomWrongOptions]);
  
  return {
    option1: allOptions[0],
    option2: allOptions[1],
    option3: allOptions[2],
    option4: allOptions[3],
    isWordOptions: true
  };
};

// Get random test words by level
router.get('/test/level/:level', async (req, res) => {
  try {
    const verbs = await Verb.find({ level: req.params.level }).lean();
    const nouns = await Noun.find({ level: req.params.level }).lean();
    
    const allWords = [...verbs, ...nouns];
    if (allWords.length === 0) {
      return res.status(404).json({ message: `No words found for level ${req.params.level}` });
    }

    const shuffledWords = shuffleArray([...allWords]);
    const testWords = shuffledWords.slice(0, 10).map((word, index) => {
      const meaning = word.meaning.split(',')[0].trim();
      const options = index < 5 ? 
        generateMeaningOptions(meaning, allWords) : 
        generateWordOptions(word.verb || word.noun, allWords);
      
      return {
        wordId: word._id,
        word: word.verb || word.noun,
        meaning,
        type: word.verb ? 'verb' : 'noun',
        example_de: word.example_de || '',
        example_en: word.example_en || '',
        ...options
      };
    });

    res.json(testWords);
  } catch (error) {
    console.error('Error generating level test:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get random test words from user's learnt words
router.get('/test/:userId', async (req, res) => {
  try {
    const learntWords = await LearntWord.find({ userId: req.params.userId }).lean();
    if (learntWords.length === 0) {
      return res.status(404).json({ message: 'No learnt words found for this user' });
    }

    // Get all verbs and nouns for options
    const allVerbs = await Verb.find().lean();
    const allNouns = await Noun.find().lean();
    const allWords = [...allVerbs, ...allNouns];

    const shuffledWords = shuffleArray([...learntWords]);
    const testWords = shuffledWords.slice(0, 10).map((word, index) => {
      const meaning = word.meaning.split(',')[0].trim();
      const options = index < 5 ? 
        generateMeaningOptions(meaning, allWords) : 
        generateWordOptions(word.word, allWords);

      return {
        wordId: word.wordId,
        word: word.word,
        meaning,
        type: word.type,
        example_de: word.example_de || '',
        example_en: word.example_en || '',
        ...options
      };
    });

    res.json(testWords);
  } catch (error) {
    console.error('Error generating test:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;