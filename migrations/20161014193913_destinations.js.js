'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('destinations', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('photo_url').notNullable().defaultTo('');
    table.string('photo_id').notNullable().defaultTo('');
    table.text('language').defaultTo('');
    table.string('currency').defaultTo('');
    table.string('x_rate').defaultTo('');
    table.string('latitude').defaultTo('');
    table.string('longitude').defaultTo('');
    table.string('type').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('destinations');
};
