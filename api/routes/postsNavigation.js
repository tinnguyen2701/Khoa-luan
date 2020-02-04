/* eslint-disable */
const postNavigationRouter = require('express').Router();
const Overview = require('../models/overviews');
const Manual = require('../models/manuals');
const logger = require('../utils/logger');

postNavigationRouter.get('/', async (req, res) => {
  const page = req.query.item;

  if (page === 'About') {
    await Overview.find({}, { name: 1, _id: 0 })
      .then(posts => {
        return res.status(200).send(posts);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when get all the posts about');
      });
  } else if (page === 'Document') {
    await Manual.find({}, { name: 1, _id: 0 })
      .then(posts => {
        return res.status(200).send(posts);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when get all the posts document');
      });
  } else {
    return res.status(500).send('Dataproxy went wrong when get all the posts');
  }
});

module.exports = postNavigationRouter;
