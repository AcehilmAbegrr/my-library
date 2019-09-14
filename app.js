const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [
    {
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
},
]

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
app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render(
    'index', {
      title: 'My Library',
      nav: [{
        link: '/books',
        title: 'Books'
      },
      {
        link: '/author',
        title: 'Author'
      }
      ]
    }
  );
});

app.listen(3000, () => {
  debug(`listening on port ${chalk.green('3000')}`);
});
