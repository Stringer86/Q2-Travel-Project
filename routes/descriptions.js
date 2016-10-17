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


router.get('/api/descriptions', (req, res, next) => {
  const { searchTerm } = req.query;

  let options = { method: 'GET',
    url: 'http://lookup.dbpedia.org/api/search.asmx/KeywordSearch',
    qs: { QueryClass: 'place', QueryString: searchTerm },
    headers:
     { 'postman-token': '20ffc4c2-91d3-cff3-230b-a471845c8066',
       'cache-control': 'no-cache',
       accept: 'application/json' } };

  request(options, function (error, response, data) {
    if (error) throw new Error(error);


      res.send(data);

  });

})

module.exports = router;
