'use strict';

const express = require('express');
const request = require('request');
const boom = require('boom');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const bcyrpt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validations = require('../validations/users');

// eslint-disable-next-line new-cap
const router = express.Router();


router.post('/api/favorites', (req, res, next) => {
  const { name, description, photoUrl } = req.body;
  const { userId } = req.token;
  // const userId = 1;

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

module.exports = router;
