'use strict';

const express = require('express');
const request = require('request');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/api/images', (req, res, _next) => {
  const { searchTerm } = req.query;

  const options = { method: 'GET',
  url: 'https://pixabay.com/api/',
  qs:
   { q: searchTerm,
     category: 'nature',
     order: 'popular',
     key: '3524767-02f5ba794561ee4931dcf448b' },
  headers:
   { 'postman-token': 'f31842c3-884f-ff6c-bf51-b6c0d6f4d809',
     'cache-control': 'no-cache',
     accept: 'application/json' }};

  request(options, (error, response, data) => {
    if (error) {
      throw new Error(error);
    }

    res.send(data);
  });
});

router.get('/api/images/city', (req, res, _next) => {
  const { searchTerm } = req.query;

  const options = { method: 'GET',
  url: 'https://pixabay.com/api/',
  qs:
   { q: searchTerm,
     category: 'city',
     order: 'popular',
     image_type: 'photo',
     key: '3524767-02f5ba794561ee4931dcf448b' },
  headers:
   { 'postman-token': 'f31842c3-884f-ff6c-bf51-b6c0d6f4d809',
     'cache-control': 'no-cache',
     accept: 'application/json' }};

  request(options, (error, response, data) => {
    if (error) {
      throw new Error(error);
    }

    res.send(data);
  });
});

module.exports = router;
