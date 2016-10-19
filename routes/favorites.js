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

router.get('/favorites', (req, res, next) => {
  // const { userId } = req.token;
  const userId = 1;

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

router.post('/favorites', (req, res, next) => {
  const { name, description, photoUrl } = req.body;
  // const { userId } = req.token;
  const userId = 1;
  console.log(req.body);

  knex('destinations')
    .where('name', name)
    .first()
    .then((destination) => {
      if (!destination) {
        return knex('destinations')
          .insert(decamelizeKeys({
            name: name,
            description: description,
            photoUrl: photoUrl
          }), '*');  // * means you get insertion result back.
      }

      return [destination]
    })
    .then((destinations) => {
      const destination = destinations[0];

      return knex('favorites')
        .insert(decamelizeKeys({
          userId,
          destinationId: destination.id
        }), '*');
    })
    .then((favorites) => {
      res.send(favorites[0]);
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
