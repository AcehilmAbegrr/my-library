const express = require('express');

const bookRouter = express.Router();

const router = (nav) => {
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
  }];
  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView', {
        nav,
        title: 'My Library',
        books
      });
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;
      res.render('bookView', {
        title: 'My Library',
        nav,
        book: books[id]
      });
    });
    return bookRouter;
};

module.exports = router;
