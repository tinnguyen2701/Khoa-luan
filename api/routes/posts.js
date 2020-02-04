/* eslint-disable */
const postRouter = require('express').Router();
const passport = require('passport');
const Overview = require('../models/overviews');
const Manual = require('../models/manuals');
const logger = require('../utils/logger');

postRouter.get('/', async (req, res) => {
  const page = req.query.item;

  if (page === 'About') {
    await Overview.find({})
      .sort({ _id: -1 })
      .then(posts => {
        return res.status(200).send(posts);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when get all the posts about');
      });
  } else if (page === 'Document') {
    await Manual.find({})
      .sort({ _id: -1 })
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

postRouter.get('/post', async (req, res) => {
  const { item, name } = req.query;
  if (item === 'About') {
    await Overview.findOne({ name })
      .then(post => {
        return res.status(200).send(post);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when get post About');
      });
  } else if (item === 'Manuals') {
    await Manual.findOne({ name })
      .then(post => {
        return res.status(200).send(post);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when get post Document');
      });
  } else {
    return res.status(500).send('Dataproxy went wrong when get post');
  }
});

postRouter.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, describe, page, homeWork } = req.body;
  if (page === 'About') {
    const newPost = new Overview({
      name,
      describe,
    });
    await newPost
      .save()
      .then(() => {
        return res.status(200).send(newPost);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when add the post');
      });
  } else if (page === 'Document') {
    const newPost = new Manual({
      name,
      describe,
      homeWork,
    });
    await newPost
      .save()
      .then(() => {
        return res.status(200).send(newPost);
      })
      .catch(err => {
        logger.logError(err);
        return res.status(500).send('Dataproxy went wrong when add the post');
      });
  } else {
    return res.status(500).send('Dataproxy went wrong when add the post');
  }
});

postRouter.post('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id, item } = req.body;
  if (item === 'About') {
    await Overview.findOneAndRemove({ _id: id })
      .then(() => {
        logger.logInfo('xoa thanh cong');
        return res.status(200).send({ id });
      })
      .catch(err => {
        logger.logError('loi khi xoa ', err);
        return res.sendStatus(500);
      });
  } else if (item === 'Document') {
    await Manual.findOneAndRemove({ _id: id })
      .then(() => {
        logger.logInfo('xoa thanh cong');
        return res.status(200).send({ id });
      })
      .catch(err => {
        logger.logError('loi khi xoa ', err);
        return res.sendStatus(500);
      });
  }
});

postRouter.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, id, describe, item, homeWork } = req.body;
  if (item == 'About') {
    await Overview.updateOne(
      { _id: id },
      { $set: { name, describe, updated_at: new Date() } },
      { upsert: true },
    )
      .then(() => {
        logger.logInfo('edit post thanh cong');
        return res.status(200).send({ id, name, describe });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  } else {
    await Manual.updateOne(
      { _id: id },
      { $set: { name, describe, homeWork, updated_at: new Date() } },
      { upsert: true },
    )
      .then(() => {
        logger.logInfo('edit post thanh cong');
        return res.status(200).send({ id, name, describe, homeWork });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  }
});

postRouter.get('/search', async (req, res) => {
  const { name } = req.query;
  const postsSearch = [];

  function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/ /g, '-');
    return str;
  }

  await Overview.find({}, { name: 1, _id: 0 })
    .then(posts => {
      posts.map(post =>
        bodauTiengViet(post.name.toLowerCase()).search(bodauTiengViet(name.toLowerCase())) > -1
          ? postsSearch.push({ page: 'About', name: post.name })
          : post,
      );
    })
    .catch(err => {
      logger.logError('find posts to search went wrong', err);
      return res.sendStatus(500);
    });

  await Manual.find({})
    .then(posts => {
      posts.map(post =>
        bodauTiengViet(post.name.toLowerCase()).search(bodauTiengViet(name.toLowerCase())) > -1
          ? postsSearch.push({ page: 'Manuals', name: post.name })
          : post,
      );
    })
    .catch(err => {
      logger.logError('find posts to search went wrong', err);
      return res.sendStatus(500);
    });
  return res.status(200).send(postsSearch);
});

module.exports = postRouter;
