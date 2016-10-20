(function() {
'use strict';

const $btn = $('.btn');
const $search = $('.autocomplete');
const $images = $('#images');
const $test = $('.test');

$.getJSON(`/favorites`)
  .done((data) => {
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      $images.append(
        `<div class="col s6">
          <div class="card small">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${data[i].photoUrl}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4 truncate">${data[i].name}<i class="material-icons right">more_vert</i></span>
              <div class="divider"></div>
              <p><a type="submit" class="btn">Delete</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${data[i].name}<i class="material-icons right">close</i></span>
              <p>${data[i].description}</p>
                <div class="divider"></div>
              <p><a type="submit" class="btn center">Search</a></p>
            </div>
          </div>
        </div>`
      )
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
