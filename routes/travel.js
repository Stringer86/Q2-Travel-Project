'use strict';

const express = require('express');
const request = require('request');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/api/travel', (req, res, _next) => {
  const { searchTerm } = req.query;

  const options = {
    method: 'GET',
    url: `https://travelbriefing.org/${searchTerm}`,
    qs: { format: 'json' },
    headers:
     { 'postman-token': '0514f7f5-b67b-4682-8264-72384514b9ff',
       'cache-control': 'no-cache',
       'content-type': 'application/x-www-form-urlencoded',
       accept: 'application/json' }};

  request(options, (error, response, data) => {
    if (error) {
      throw new Error(error);
    }

    res.send(data);
  });
});

module.exports = router;
