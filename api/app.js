const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
const passport = require('passport');

const admin = require('./routes/admin');
const posts = require('./routes/posts');
const users = require('./routes/users');
const postsNavigation = require('./routes/postsNavigation');
// const Account = require('./models/account');
// var http = require('http');

const app = express();

app.use(cors());

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
require('./config/passport')(passport);

// bcrypt.genSalt(10, function(err, salt) {
//   bcrypt.hash('tkstudio2450542', salt, function(err, hash) {
//     const newUser = new Account({
//       username: 'tkstudio',
//       password: hash,
//     });

//     newUser
//       .save()
//       .then(newUser => console.log('ok'))
//       .catch(err => console.log('can not save user', err));
//   });
// });

app.use('/api/auth', admin);
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/postsNavigation', postsNavigation);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('build', 'index.html'));
  });
}

// setInterval(function() {
//   http.get('http://tk-studio.herokuapp.com');
// }, 600000); // every 5 minutes (300000)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
