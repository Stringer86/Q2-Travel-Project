/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('destinations').del()
    .then(() => {
      return knex('destinations').insert([{
        id: 1,
        name: 'Chile',
        description: 'Chile is nature on a colossal scale, but travel here is surprisingly easy if you don\'t rush it.',
        photo_url: 'https://c.tadst.com/gfx/750w/rapa-nui-chile.jpg?1',
        photo_id: '1549393',
        language: 'Spanish',
        currency: 'Chilean Peso',
        x_rate: '667.690002',
        latitude: '-36.739055',
        longitude: '-71.0574942',
        type: 'country',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        name: 'Vietnam',
        description: 'Astonishingly exotic and utterly compelling, Vietnam is a country of breathtaking natural beauty with a unique heritage, where travel quickly becomes addictive.',
        photo_url: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-537320635_super.jpg?sharp=10&vib=20&w=1200',
        photo_id: '1014711',
        language: 'Vietnamese',
        currency: 'Dong',
        x_rate: '22306',
        latitude: '15.9030623',
        longitude: '105.8066925',
        type: 'country',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        name: 'Germany',
        description: 'Prepare for a roller coaster of feasts, treats and temptations as you take in Germany\'s soul-stirring scenery, spirit-lifting culture, big-city beauties, romantic palaces and half-timbered towns.',
        photo_url: 'http://www.placestoseeinyourlifetime.com/wp-content/uploads/2016/05/Berlin-Photo-from-Smart-Camp-980x653.jpg',
        photo_id: '188347',
        language: 'German',
        currency: 'Euro',
        x_rate: '0.910601',
        latitude: '51.1642292',
        longitude: '10.4541193',
        type: 'country',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw("SELECT setval('destinations_id_seq', (SELECT MAX(id) FROM destinations));"
    );
  });
};
