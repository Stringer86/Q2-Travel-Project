
(function() {
'use strict';

const $topRow = $('.topRow');
const $middleRow = $('.middleRow');
const $middleRow2 = $('.middleRow2');
const $bottomRow = $('.bottomRow');
const $description = $('.description');
const $head = $('.head');

$.getJSON(`/api/images?searchTerm=${localStorage.input}`)
  .done((data) => {
    let hits = data.hits;
    let images = [];

    for (let i = 0; i < hits.length; i++) {
      images.push(hits[i].webformatURL);
    }
    console.log(images);

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
      let description = data.results[0].description;
      let country = description.slice(0, description.indexOf(' '));

      $description.append(`${description}`);

      $head.append(`${country} is a great choice!`);
    })
    .fail(() => {
      console.log("desciption not working");
    })




})();
