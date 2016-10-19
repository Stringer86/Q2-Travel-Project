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

router.get('/api/travel', (req, res, next) => {
  const { searchTerm } = req.query;

  var options = { method: 'GET',
  url: `https://travelbriefing.org/${searchTerm}`,
  qs: { format: 'json' },
  headers:
   { 'postman-token': '0514f7f5-b67b-4682-8264-72384514b9ff',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded',
     accept: 'application/json' } };

request(options, function (error, response, data) {
  if (error) throw new Error(error);

  res.send(data);
});
})
