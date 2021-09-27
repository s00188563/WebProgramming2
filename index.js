const express = require('express');
const app = express();
const port = 3000;

let books = [
  {
    bookId: 1,
    name: 'Gansta Granny',
    quantity: 3,
  },
  {
    bookId: 2,
    name: 'The Boy in the Dress',
    quantity: 2,
  },
  {
    bookId: 3,
    name: 'Bad Dad',
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies

app.get('/', (req, res) => res.send('Hello World from Luigi!'));
app.get('/bananas', (req, res) => res.send('hello world, this is bananas'));
app.get('/books', (req, res) => {
  res.send(books);
});
app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);

  res.send('book has been added to the database');
  console.log(`book name is ${book.name} number of book is ${books.length}`);
});

/* app.get('/books/:id', (req, res) => {
  let id = req.params.id;
  res.json(books[id]);
}); */
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find((b) => b.bookId === parseInt(req.params.id));

  if (!book) {
    res.status(404);
    res.json({ error: 'not found' });
    return;
  }

  res.json(book);
});

/* app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);

  res.send('book has been added to the database');
  console.log(`book name is ${book.name} number of book is ${books.length}`);
}); */
app.post('/books', (req, res) => {
  const newBookId = books.length;

  const book = { bookId: newBookId, ...req.body };

  books.push(book);

  res.location(`/books/${newBookId}`).status(201).json(book);

  console.log(`book name is ${book.name} number of book(s) is ${books.length}`);
});

/* app.delete('/books/:id', (req, res) => {
  let id = req.params.id;
  console.log(`removing book ${books[id].name}`);
  books.splice(req.params.id, 1);
  res.send(books);
});
 */
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  const book = books.find((b) => b.bookId === parseInt(req.params.id));

  if (!book) {
    res.status(404).json(`book with that ID {id} was not found`);
    return;
  }

  const index = books.indexOf(book);

  books.splice(index, 1);
  res.send(book);
});

app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find((b) => b.bookId === parseInt(req.params.id));

  if (!book) {
    res.status(404).json(`book with that ID {req.params.id} was not found`);
    return;
  }

  console.log(`changing book ${book.name}`);
  book.name = req.body.name;
  book.quantity = req.body.quantity;

  res.send(book);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
