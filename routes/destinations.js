'use strict';

const express = require('express');
const knex = require('../knex');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/api/destinations', (req, _res, _next) => {
  const { userId, name, description, photoUrl } = req.body;

  knex('destinations')
    .where('name', name)
    .first()
    .then((name) => {
      if (!name) {
        knex('destinations')
          .insert({
            name: name,
            description: description,
            photo_url: photoUrl
          });
      }
    });
});

module.exports = router;
