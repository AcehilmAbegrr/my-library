const express = require('express');

const bookRouter = express.Router();
const books = [{
  title: 'Of Mice and Men',
  genre: 'Fiction',
  author: 'John Steinbeck',
  read: false
}, {
  title: 'War and Peace',
  genre: 'Historical Fiction',
  author: 'Leo Tolstoy',
  read: false
}, {
  title: 'Old Man and the Sea',
  genre: 'Fiction',
  author: 'Earnest Hemmingway',
  read: false
}, {
  title: 'For Whome the Bell Tolls',
  genre: 'Fiction',
  author: 'Earnest Hemmingway',
  read: false
}, {
  title: 'Atlas Shrugged',
  genre: 'Fiction',
  author: 'Ayn Rand',
  read: false
}, ];

bookRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      title: 'My Library',
      nav: [{
        link: '/books',
        title: 'Books'
      },
      {
        link: '/author',
        title: 'Author'
      }
      ],
      books
    });
  });


bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

module.exports = bookRouter;
