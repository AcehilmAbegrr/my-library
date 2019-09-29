const express = require('express');
const {
  MongoClient
} = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

module.exports = function router() {
  authRouter.route('/signup')
    .post((req, res) => {
      debug(req.body);
      const {
        username,
        password
      } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');

          const db = client.db(dbName);
          const col = await db.collection('users');
          const user = {
            username,
            password
          };
          const results = await col.insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error);
        }
      }());
      // create user
      
    });
  authRouter.route('/profile')
    .get((req, res) => {
      debug(`user is ${req.user}`);
      res.json(req.user);
    });
  return authRouter;
};