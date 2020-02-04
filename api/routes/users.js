/* eslint-disable */
const userRouter = require('express').Router();
const User = require('../models/users');
const Manual = require('../models/manuals');
const Overview = require('../models/overviews');
const logger = require('../utils/logger');

userRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });
  await newUser
    .save()
    .then(result => {
      return res.status(200).send({ username });
    })
    .catch(err => {
      logger.logError(err);
      return res.status(500).send('Dataproxy went wrong when register user');
    });
});

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  await User.findOne({ username })
    .then(result => {
      if (result.password !== password) {
        return res.status(403).send({ username });
      } else return res.status(200).send({ username });
    })
    .catch(err => {
      logger.logError(err);
      return res.status(500).send('Dataproxy went wrong when login user');
    });
});

userRouter.post('/like', async (req, res) => {
  const { id, username, item } = req.body;
  if (item == 'About') {
    await Overview.findById(id)
      .then(result => {
        result.favorites.push(username);
        result
          .save()
          .then(() => {
            logger.logInfo('update like went wrong');
            return res.status(200).send(result.favorites);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  } else {
    await Manual.findById(id)
      .then(result => {
        result.favorites.push(username);
        result
          .save()
          .then(() => {
            logger.logInfo('update like went wrong');
            return res.status(200).send(result.favorites);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  }
});

userRouter.post('/unlike', async (req, res) => {
  const { id, username, item } = req.body;
  if (item == 'About') {
    await Overview.findById(id)
      .then(result => {
        result.favorites = result.favorites.filter(x => x != username);
        result
          .save()
          .then(() => {
            logger.logInfo('update unlike went wrong');
            return res.status(200).send(result.favorites);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  } else {
    await Manual.findById(id)
      .then(result => {
        result.favorites = result.favorites.filter(x => x != username);
        result
          .save()
          .then(() => {
            logger.logInfo('update unlike went wrong');
            return res.status(200).send(result.favorites);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  }
});

userRouter.post('/addComment', async (req, res) => {
  const { id, username, comment, item } = req.body;

  if (item == 'About') {
    await Overview.findById(id)
      .then(result => {
        result.comments.push({ username, comment });
        result
          .save()
          .then(() => {
            logger.logInfo('add comment went wrong');
            return res.status(200).send(result.comments);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  } else {
    await Manual.findById(id)
      .then(result => {
        result.comments.push({ username, comment });
        result
          .save()
          .then(() => {
            logger.logInfo('add comment went wrong');
            return res.status(200).send(result.comments);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  }
});

userRouter.post('/deleteComment', async (req, res) => {
  const { postId, commentId, item } = req.body;

  if (item == 'About') {
    await Overview.findById(postId)
      .then(result => {
        result.comments = result.comments.filter(x => x._id.equals(commentId) == false);
        result
          .save()
          .then(() => {
            logger.logInfo('delete comment went wrong');
            return res.status(200).send(result.comments);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  } else {
    await Manual.findById(postId)
      .then(result => {
        result.comments = result.comments.filter(x => x._id.equals(commentId) == false);
        result
          .save()
          .then(() => {
            logger.logInfo('delete comment went wrong');
            return res.status(200).send(result.comments);
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(err => {
        logger.logInfo('find post went wrong');
        return res.status(500).send(err);
      });
  }
});

module.exports = userRouter;
