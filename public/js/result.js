
(function() {
'use strict';

const $topRow = $('.topRow');
const $middleRow = $('.middleRow');
const $bottomRow = $('.bottomRow');
const $btn = $('.btn');
const $description = $('.description');
const $head = $('.head');
const $search = $('#search');

function getPhotos() {
  event.preventDefault();

        let text = $search.val();
        // let text = location.search; // need regular expression. // learn capture groups // learn reg expression

        let $xhr = $.getJSON(`https://pixabay.com/api/?q=${text}&category=nature&key=3524767-02f5ba794561ee4931dcf448b`);

        $xhr.done(function(data) {
            if ($xhr.status !== 200) {
                return;
            }
        let hits = data.hits;
        let images = [];
        let photoIds = [];

        for (let i = 0; i < 9; i++) {
          images.push(hits[i].webformatURL);
          photoIds.push(hits[i].id);
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
          else {
            $bottomRow.append(`<div class="col s4"><img class="materialboxed" width="300px" height="300px" src="${images[i]}">
            </div>`);
          }
        }
        $('.materialboxed').materialbox();
        });

    }


function getDescription() {

  let text = $search.val();

  let settings = {
  "async": true,
  "crossDomain": true,
  "url": `http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?QueryClass=place&QueryString=${text}`,
  "method": "GET",
  "headers": {
    "accept": "application/json",
    "cache-control": "no-cache",
    "postman-token": "2f663199-3ab8-8b12-a145-e5be81d6bd74"
  }
}

$.ajax(settings).done(function (response) {


  let description = response.results[0].description;
  let country = description.slice(0, description.indexOf(' '));

  $description.append(`${description}`);

  $head.append(`${country} is a great choice!`);

  });

}

$btn.click(getPhotos);
$btn.click(getDescription);


})();
