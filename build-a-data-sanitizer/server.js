const express = require('express');
const path = require('path');
const { inputCleaner, inputValidator } = require('./middleware');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/form');
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public'), { index: false }));

app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.json({
    username: req.body.username,
    comment: req.body.comment
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
