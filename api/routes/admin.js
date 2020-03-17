/* eslint-disable */
const adminRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/users');

adminRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(403);

  await User.findOne({ username }).then(user => {
    if (!user || !user.isAdmin) return res.sendStatus(403);

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }, function(
          err,
          token,
        ) {
          return res.status(200).send({
            success: true,
            token: token,
          });
        });
      } else {
        return res.sendStatus(403);
      }
    });
  });
});

adminRouter.post('/currentUser', async (req, res) => {
  await jwt.verify(req.body.token, process.env.JWT_SECRET, async function(err, decoded) {
    await User.findOne({ isAdmin: true })
      .then(account => {
        if (account._id.equals(decoded.id)) {
          if (Date.now() >= decoded.exp * 1000) {
            return res.sendStatus(304);
          }
          return res.sendStatus(200);
        } else {
          return res.sendStatus(304);
        }
      })
      .catch(err => {
        return res.status(500).send('call dataproxy went wrong!');
      });
  });
});

module.exports = adminRouter;
