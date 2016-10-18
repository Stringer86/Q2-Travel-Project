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


router.post('/api/destinations', (req, res, next) => {
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
          })
      }
    })

module.exports = router;
