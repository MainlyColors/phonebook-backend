const express = require('express');
const app = express();
const morgan = require('morgan');

let phoneBookData = [
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
// MIDDLEWARE
// *************
// uses body-parser under the hood
app.use(express.json());

// custom format token to use
morgan.token('bodyContent', function getId(req, res) {
  return JSON.stringify(req.body);
});

// mostly the tiny configure but :bodyContent added to the end
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :bodyContent'
  )
);

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

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const randomID = Math.floor(Math.random() * 1000);

  const newPerson = {
    id: randomID,
    name: body.name,
    number: body.number,
  };

  // if missing properties
  if (!body.name || !body.number) {
    return res
      .status(404)
      .send(JSON.stringify({ error: 'name OR number property is missing' }));
  }

  const nameDuplicate = phoneBookData.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );
  //if name is already taken
  if (nameDuplicate !== undefined) {
    return res
      .status(404)
      .send(JSON.stringify({ error: 'name already taken and in database' }));
  }

  phoneBookData.push(newPerson);
  res.send(phoneBookData);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phoneBookData.find((person) => person.id === id);
  if (person === undefined) {
    return res.status(404).send('Bad Request: Person not found');
  }

  res.send(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phoneBookData.find((person) => person.id === id);
  if (person === undefined) {
    return res.status(404).send('Bad Request: Person not found');
  }

  // remove only person with matching id
  phoneBookData = phoneBookData.filter((person) => person.id !== id);
  res.send(phoneBookData);
});

const PORT = 8000;
app.listen(PORT, (err) => {
  console.log(`listening on port ${PORT}`);
});
