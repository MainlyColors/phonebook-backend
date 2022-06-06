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
  res.send(
    `Phonebook has info for ${phoneBookData.length} people <br>${new Date()}`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(phoneBookData);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phoneBookData.find((person) => person.id === id);
  if (person === undefined) {
    return res.status(404).send('Bad Request: Person not found');
  }

  res.send(person);
});

const PORT = 8000;
app.listen(PORT, (err) => {
  console.log(`listening on port ${PORT}`);
});
