require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const verbsRouter = require('./routes/verbs');
const nounsRouter = require('./routes/nouns');
const adjectivesRouter = require('./routes/adjectives');
const adverbsRouter = require('./routes/adverbs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    // Routes
    app.use('/api/verbs', verbsRouter);
    app.use('/api/nouns', nounsRouter);
    app.use('/api/adjectives', adjectivesRouter);
    app.use('/api/adverbs', adverbsRouter);

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