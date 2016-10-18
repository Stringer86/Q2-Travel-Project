(function() {
'use strict';

const $topRow = $('.topRow');
const $middleRow = $('.middleRow');
const $middleRow2 = $('.middleRow2');
const $bottomRow = $('.bottomRow');
const $description = $('.description');
const $head = $('.head');
const $favorite = $('#favorite');

let hits;
let images = [];
let description;

$.getJSON(`/api/images?searchTerm=${localStorage.input}`)
  .done((data) => {
    hits = data.hits;


    for (let i = 0; i < hits.length; i++) {
      images.push(hits[i].webformatURL);
    }

    for (let i = 0; i < images.length; i++) {
      if (i < 3) {
        $topRow.append(`<div class="col s4"><img class="materialboxed" width="300px" height="300px" src="${images[i]}">
        </div>`);
      }
      else if (i < 6){
        $middleRow.append(`<div class="col s4"><img class="materialboxed" width="300px" height="300px" src="${images[i]}">
        </div>`);
      }
      else if (i < 9){
        $middleRow2.append(`<div class="col s4"><img class="materialboxed" width="300px" height="300px" src="${images[i]}">
        </div>`);
      }
      else {
        $bottomRow.append(`<div class="col s4"><img class="materialboxed" width="300px" height="300px" src="${images[i]}">
        </div>`);
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
      const country = description.slice(0, description.indexOf(' '));

      $description.append(`${description}`);

      $head.append(`${country} is a great choice!`);


    })
    .fail(() => {
      console.log("desciption not working");
    })

function favoriteIt(event) {
  event.preventDefault();

  console.log(localStorage.input);
  console.log(description);
  console.log(images[4]);

  const name = localStorage.input;
  const photoUrl = images[4];

  const options = { //req body
    contentType: 'application/json',
    data: JSON.stringify({ name, description, photoUrl }),
    dataType: 'json',
    type: 'POST',
    url: '/api/favorites'
  };

  $.ajax(options)
    .done(() => {
          Materialize.toast('Added book to your favorites', 3000);
        })
        .fail(() => {
          Materialize.toast('Unable to add this book to your favorites', 3000);
        });


}

$favorite.click(favoriteIt);



})();
