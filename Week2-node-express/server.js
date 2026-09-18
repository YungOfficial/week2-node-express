require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Bonus middleware - logs requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  res.json({ message: `Hello, ${name}!` });
});

app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});