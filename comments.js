// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Read all comments from comments.json
let comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Use body parser to get data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Set up view engine
app.set('view engine', 'ejs');

// Set up static files
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.render('index', { comments });
});

// Add a comment
app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.redirect('/');
});

// Start server
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});