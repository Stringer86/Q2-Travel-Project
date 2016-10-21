(function() {
'use strict';


const $description = $('.description');
const $btn = $('.btn');
const $images = $('.images');
let language,
    currency,
    xRate,
    latitude,
    longitude;



let hits;
let images = [];
let description;


$.getJSON(`/api/images/city/?searchTerm=${localStorage.input}`)
  .done((data) => {
    hits = data.hits;


    for (let i = 0; i < hits.length; i++) {
      images.push(hits[i].webformatURL);
    }
    console.log(images);

    for (let i = 0; i < images.length; i++) {
        $images.append(`<div class="col s3"><img class="materialboxed" width="200px" height="200px" src="${images[i]}">
        </div>`);
        if ((i - 3) % 4 === 0) {
          $images.append(`<div class=row></div>`)
        }
    }
    $('.materialboxed').materialbox();

  })
  .fail(() => {
    console.log("images not working");
  });

  $.getJSON(`/api/descriptions?searchTerm=${localStorage.input}`)
  .done((data) => {
    description = data.results[0].description;

    $description.append(`${description}`);


  })
  .fail(() => {
    console.log("desciption not working");
  })


function favoriteIt(event) {
  event.preventDefault();

  const name = localStorage.input.charAt(0).toUpperCase() + localStorage.input.slice(1);;
  const photoUrl = images[2];

  const options = { //req body
    contentType: 'application/json',
    data: JSON.stringify({ name, description, photoUrl, language, currency, xRate, latitude, longitude }),
    dataType: 'json',
    type: 'POST',
    url: '/favorites'
  };

  $.ajax(options)
    .done(() => {
          Materialize.toast('Added destination to your favorites', 3000);
        })
        .fail(() => {
          Materialize.toast('Unable to add this destination to your favorites', 3000);
        });


}

$btn.click(favoriteIt);



})();
