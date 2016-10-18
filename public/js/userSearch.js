(function() {
'use strict';

const $btn = $('.btn');
const $search = $('#search');

function searchIt(event) {
  event.preventDefault();

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

$('.button-collapse').sideNav({
    menuWidth: 600, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true
  }
);

  })();
