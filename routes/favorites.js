'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

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

router.post('/favorites', authorize, (req, res, next) => {
  const { name, description, photoUrl, language, currency, xRate, latitude, longitude } = req.body;
  const { userId } = req.token;

  knex('destinations')
    .where('name', name)
    .first()
    .then((destination) => {
      if (!destination) {
        return knex('destinations')
          .insert(decamelizeKeys({
            name: name,
            description: description,
            photoUrl: photoUrl,
            language: language,
            currency: currency,
            xRate: xRate,
            latitude: latitude,
            longitude: longitude
          }), '*');  // * means you get insertion result back.
      }

      return [destination];
    })
    .then((destinations) => {
      const destination = destinations[0];

      return knex('favorites')
        .where('destination_id', destination.id)
        .where('user_id', userId)
        .first()
        .then((favorite) => {
          if (!favorite) {
            return knex('favorites')
              .insert(decamelizeKeys({
                userId,
                destinationId: destination.id
              }), '*');
          }
          return [favorite];
        })
        .then((favorites) => {
          res.send(favorites[0]);

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
  const { userId } = req.token;
  const { destinationId } = req.body;

  knex('favorites')
    .where('destination_id', destinationId)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Favorite not found');
      }

      return knex('favorites')
        .where('destination_id', destinationId)
        .where('user_id', userId)
        .del();
    })
    .then(() => {
      res.send(camelizeKeys({ destinationId, userId }));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
