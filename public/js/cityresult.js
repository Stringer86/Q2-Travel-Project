'use strict';
(function() {

// eslint-disable-next-line max-statements
  const $description = $('.description');
  const $btn = $('.btn');
  const $images = $('.images');
  let language;
  let currency;
  let xRate;
  let latitude;
  let longitude;

  let hits;
  const images = [];
  let description;

  $.getJSON(`/api/images/city/?searchTerm=${localStorage.input}`)
    .done((data) => {
      hits = data.hits;

      for (let i = 0; i < hits.length; i++) {
        images.push(hits[i].webformatURL);
      }

      for (let i = 0; i < images.length; i++) {
        $images.append(
          `<img class="materialboxed col s3" width="200px" height="200px"
          src="${images[i]}">`);
        if ((i - 3) % 4 === 0) {
          $images.append('<div class=row></div>');
        }
      }
      $('.materialboxed').materialbox();
    })
    .fail(() => {
      Materialize.toast('Images not loading', 3000);
    });

  $.getJSON(`/api/descriptions?searchTerm=${localStorage.input}`)
  .done((data) => {
    description = data.results[0].description;

    $description.append(`${description}`);
  })
  .fail(() => {
    Materialize.toast('Description not loading', 3000);
  });

  $.getJSON(`api/coordinates?searchTerm=${localStorage.input}`)
  .done((data) => {
    latitude = data.results[0].geometry.location.lat;
    longitude = data.results[0].geometry.location.lng;

  })
  .fail(() => {
    Materialize.toast('Coordinates not loading', 3000);
  });

  function favoriteIt(event) {
    event.preventDefault();

    const name =
      localStorage.input.charAt(0).toUpperCase() + localStorage.input.slice(1);
    const photoUrl = images[2];

    const options = { // req body
      contentType: 'application/json',
      data: JSON.stringify({
        name,
        description,
        photoUrl,
        language,
        currency,
        xRate,
        latitude,
        longitude
      }),
      dataType: 'json',
      type: 'POST',
      url: '/favorites'
    };

    $.ajax(options)
      .done(() => {
        Materialize.toast('Added destination to your favorites', 3000);
      })
      .fail(() => {
        Materialize.toast(
          'Unable to add this destination to your favorites', 3000);
      });
  }

  $btn.click(favoriteIt);
})();
