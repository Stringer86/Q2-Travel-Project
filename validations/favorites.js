'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    destinationId: Joi.number()
    .required()
    .min(0)
    .integer()
    .label('Destination Id')
  }
}
