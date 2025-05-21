require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const verbsRouter = require('./routes/verbs');
const nounsRouter = require('./routes/nouns');
const adjectivesRouter = require('./routes/adjectives');
const adverbsRouter = require('./routes/adverbs');
const grammarPostsRouter = require('./routes/grammarPosts');
const learntWordsRouter = require('./routes/learntWords');
const vocabTestsRouter = require('./routes/vocabTests');
const readingPostsRouter = require('./routes/readingPosts');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    // Routes
    app.use('/api/verbs', verbsRouter);
    app.use('/api/nouns', nounsRouter);
    app.use('/api/adjectives', adjectivesRouter);
    app.use('/api/adverbs', adverbsRouter);
    app.use('/api/grammar', grammarPostsRouter);
    app.use('/api/learnt-words', learntWordsRouter);
    app.use('/api/vocab-tests', vocabTestsRouter);
    app.use('/api/reading', readingPostsRouter);
    app.get('/', (req, res) => {
      res.json({ 
        message: 'Welcome to the German Language API!'
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });