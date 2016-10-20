(function() {
'use strict';

const $btn = $('.btn');
const $search = $('.autocomplete');
const $test = $('.test');

$.getJSON(`/favorites`)
  .done((data) => {

    console.log(data);

    for (let i = 0; i < data.length; i++) {
      $test.append(`<div class="col s3 m3">
          <div class="card">
            <div class="card-image">
              <img src="${data[i].photoUrl}">
              <span class="card-title">${data[i].name}</span>
            </div>
            <div class="card-content">
              <p>${data[i].description}</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>`)
    }

  })
  .fail(() => {
    console.log("desciption not working");
  })

function searchIt(event) {
  event.preventDefault();
  console.log("hello");
  const searchInput = $search.val().trim();
  localStorage.input = searchInput;

  if (!searchInput) {
    return Materialize.toast('Search must not be blank', 3000);
  }

  const options = {
    contentType: 'application/json',
    data: JSON.stringify({ searchInput }),
    dataType: 'json',
    type: 'GET',
    url: '/api/images'
  };

  $.ajax(options)
    .done(() => {
      console.log("hello");
      window.location.href = `/result.html?${searchInput}`;
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });

}

$btn.click(searchIt);

})();
