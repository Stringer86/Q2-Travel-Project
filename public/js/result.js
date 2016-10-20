(function() {
'use strict';


const $description = $('.description');
const $btn = $('.btn');
const $images = $('.images');
const $country = $('#country');
const $language = $('#language');
const $currency = $('#currency');
const $neighbors = $('#neighbors');

const $jan = $('#jan');
const $feb = $('#feb');
const $mar = $('#mar');
const $apr = $('#apr');
const $may = $('#may');
const $jun = $('#jun');
const $jul = $('#jul');
const $aug = $('#aug');
const $sep = $('#sep');
const $oct = $('#oct');
const $nov = $('#nov');
const $dec = $('#dec');


let hits;
let images = [];
let description;
let language;
let currency;
let xRate;
let latitude;
let longitude;

$.getJSON(`/api/images?searchTerm=${localStorage.input}`)
  .done((data) => {
    hits = data.hits;


    for (let i = 0; i < hits.length; i++) {
      images.push(hits[i].webformatURL);
    }
    console.log(images);

    for (let i = 0; i < images.length; i++) {
        $images.append(`<div class="col s4"><img class="materialboxed" width="200px" height="200px" src="${images[i]}">
        </div>`);
        if ((i - 2) % 3 === 0) {
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

  $.getJSON(`/api/travel?searchTerm=${localStorage.input}`)
    .done((data) => {

      let country = data.names.name;

      let neighArray = data.neighbors;

      let neighbors = neighArray.map((element) => {
        return element.name;
      });

      let temperatures = data.weather;

      language = data.language[0].language;
      currency = data.currency.name;
      xRate = data.currency.rate;
      latitude = data.maps.lat;
      longitude = data.maps.long;

    $country.append(country);
    $language.append(language);
    $currency.append(currency);

    for (var i = 0; i < neighbors.length; i++) {
      $neighbors.append(`${neighbors[i]}, `);
    }

    $jan.append(parseFloat(temperatures.January.tAvg).toFixed(2) + ' Celcius');
    $feb.append(parseFloat(temperatures.February.tAvg).toFixed(2) + ' Celcius');
    $mar.append(parseFloat(temperatures.March.tAvg).toFixed(2) + ' Celcius');
    $apr.append(parseFloat(temperatures.April.tAvg).toFixed(2) + ' Celcius');
    $may.append(parseFloat(temperatures.May.tAvg).toFixed(2) + ' Celcius');
    $jun.append(parseFloat(temperatures.June.tAvg).toFixed(2) + ' Celcius');
    $jul.append(parseFloat(temperatures.July.tAvg).toFixed(2) + ' Celcius');
    $aug.append(parseFloat(temperatures.August.tAvg).toFixed(2) + ' Celcius');
    $sep.append(parseFloat(temperatures.September.tAvg).toFixed(2) + ' Celcius');
    $oct.append(parseFloat(temperatures.October.tAvg).toFixed(2) + ' Celcius');
    $nov.append(parseFloat(temperatures.November.tAvg).toFixed(2) + ' Celcius');
    $dec.append(parseFloat(temperatures.December.tAvg).toFixed(2) + ' Celcius');


    })
    .fail(() => {
      console.log("desciption not working");
    })

function favoriteIt(event) {
  event.preventDefault();

  const name = localStorage.input.charAt(0).toUpperCase() + localStorage.input.slice(1);;
  const photoUrl = images[4];

  const options = { //req body
    contentType: 'application/json',
    data: JSON.stringify({ name, description, photoUrl, language, currency, xRate, latitude, longitude }),
    dataType: 'json',
    type: 'POST',
    url: '/favorites'
  };

  $.ajax(options)
    .done(() => {
          Materialize.toast('Added book to your destination', 3000);
        })
        .fail(() => {
          Materialize.toast('Unable to add this destination to your favorites', 3000);
        });


}

$btn.click(favoriteIt);



})();
