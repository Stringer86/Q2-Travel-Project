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

// const authorize = function(req, res, next) {
//   jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return next(boom.create(401, 'Unauthorized'));
//     }
//
//     req.token = decoded;
//     next();
//   });
// };

router.get('/api/images', (req, res, next) => {
  const { searchTerm } = req.query;
  // const searchTerm = localStorage.input;
  console.log(searchTerm);

  let options = { method: 'GET',
  url: 'https://pixabay.com/api/',
  qs:
   { q: searchTerm,
     category: 'city',
     order: 'popular',
     key: '3524767-02f5ba794561ee4931dcf448b' },
  headers:
   { 'postman-token': 'f31842c3-884f-ff6c-bf51-b6c0d6f4d809',
     'cache-control': 'no-cache',
     accept: 'application/json' } };

    request(options, function (error, response, data) {
        if (error) throw new Error(error);

        res.send(data);

      });
})

module.exports = router;
