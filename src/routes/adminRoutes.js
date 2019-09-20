const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

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
const router = (nav) => {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (error) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
};

module.exports = router;
