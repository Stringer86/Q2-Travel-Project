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
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        name: 'Vietnam',
        description: 'Astonishingly exotic and utterly compelling, Vietnam is a country of breathtaking natural beauty with a unique heritage, where travel quickly becomes addictive.',
        photo_url: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-537320635_super.jpg?sharp=10&vib=20&w=1200',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        name: 'Germany',
        description: 'Prepare for a roller coaster of feasts, treats and temptations as you take in Germany\'s soul-stirring scenery, spirit-lifting culture, big-city beauties, romantic palaces and half-timbered towns.',
        photo_url: 'http://www.placestoseeinyourlifetime.com/wp-content/uploads/2016/05/Berlin-Photo-from-Smart-Camp-980x653.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        name: 'Argentina',
        description: 'It\'s apparent why Argentina has long held travelers in awe: tango, beef, gauchos, fútbol, Patagonia, the Andes. The classics alone make a formidable wanderlust cocktail.',
        photo_url: 'http://sevennaturalwonders.org/wp-content/uploads/2008/12/Iguassu_Falls-805x450.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 5,
        name: 'Victoria Falls',
        description: `Taking its place alongside the Pyramids and the Serengeti, Victoria Falls (Mosi-oa-Tunya – the 'smoke that thunders') is one of Africa’s original blockbusters. And although Zimbabwe and Zambia share it, Victoria Falls is a place all of its own.`,
        photo_url: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/927/overrides/tourists-observing-victoria-falls_92761_600x450.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    });
};
