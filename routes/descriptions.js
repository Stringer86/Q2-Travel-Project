'use strict';

const express = require('express');
const request = require('request');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/api/descriptions', (req, res, _next) => {
  const { searchTerm } = req.query;

  const options = { method: 'GET',
    url: 'http://lookup.dbpedia.org/api/search.asmx/KeywordSearch',
    qs: {
      QueryClass: 'place',
      QueryString: searchTerm
    },
    headers: {
      'postman-token': '20ffc4c2-91d3-cff3-230b-a471845c8066',
      'cache-control': 'no-cacxhe',
      accept: 'application/json'
    }
  };

  request(options, (error, response, data) => {
    if (error) {
      throw new Error(error);
    }

    res.send(data);
  });
});

module.exports = router;
