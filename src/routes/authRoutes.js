const express = require('express');
const {
  MongoClient
} = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport')

const authRouter = express.Router();

module.exports = function router(nav) {
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
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .get((req, res) => {
      debug(`user is ${req.session.passport.user}`);
      res.json(req.session.passport.user);
    });
  return authRouter;
};