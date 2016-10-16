'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const ev = require('express-validation');
const validations = require('../validations/users');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;

    next();
  });
};

router.get('/favorites', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('favorites')
    .innerJoin('destinations', 'destinations.id', 'favorites.destination_id')
    .where('favorites.user_id', userId)
    .orderBy('destinations.name', 'ASC')
    .then((rows) => {
      const favorites = camelizeKeys(rows);

      res.send(favorites);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/favorites/:id', authorize, (req, res, next) => {

  knex('favorites')
    .where('destination_id', req.query.bookId)
    .then((favorites) => res.send(favorites.length > 0))
    .catch((err) => {
      next(err)
    });
});

router.post('/favorites', authorize, ev(validations.post), (req, res, next) => {
  const { userId } = req.token;
  // const { bookId } = req.body;

  const favorite = { bookId, /*userId*/ };

  knex('destinations')
     .where('id', destination_id)
     .first()
     .then((row) => {
       if (!row) return next(boom.create(404, 'Destination not found'));

      return knex('favorites')
        .insert(decamelizeKeys(favorite), '*')
        .then((rows) => {
          const insertFav = camelizeKeys(rows[0]);

          res.send(insertFav); // then give me what I just inserted into the DB
        })
        .catch((err) => {
          next(err);
        });
      })
      .catch((err) => {
        next(err);
      });
    });

router.delete('/favorites', authorize, (req, res, next) => {
  let favorite;
  const  { /* DestinaitonId */ }  = req.body;

  knex('destinations')
   .where('destination_id', destinationId)
   .first()
   .then((row) => {
     if (!row) return next(boom.create(404, 'Destination not found'));

      favorite = row;

      return knex('favorites')
        .del()
        .where('book_id', destinationId);
    })
    .then(() => {
      delete favorite.id;
      const jsonFavorite = camelizeKeys(favorite);

      res.clearCookie('favorites');
      res.send(jsonFavorite);
    })
      .catch((err) => {
        next(err);
      });
});

module.exports = router;
