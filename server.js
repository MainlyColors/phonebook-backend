const express = require('express');
const app = express();

const phoneBookData = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// *************
// ROUTES
// *************

app.get('/info', (req, res) => {
  res.end(`Phonebook has info for ${phoneBookData.length} people
${new Date()}`);
});

app.get('/api/persons', (req, res) => {
  res.json(phoneBookData);
});

const PORT = 8000;
app.listen(PORT, (err) => {
  console.log(`listening on port ${PORT}`);
});
