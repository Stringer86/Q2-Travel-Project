(function() {
'use strict';

const $btn = $('.btn');
const $search = $('.autocomplete');
const $test = $('.test');

$.getJSON(`/favorites`)
  .done((data) => {

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


// $.getJSON(`/favorites`)
//   .done((data) => {
//
//     let locations = [];
//     for (let i = 0; i < data.length; i++) {
//       let place = data[i].name;
//       let lat = parseFloat(data[i].latitude);
//       let long = parseFloat(data[i].longitude);
//
//       locations.push([place, lat, long, i]);
//       console.log(locations);
//
//     }
//
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 1,
//       center: new google.maps.LatLng(34.5133, -94.1629),
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     });
//
//     var infowindow = new google.maps.InfoWindow();
//
//     var marker, i;
//
//     for (i = 0; i < locations.length; i++) {
//       marker = new google.maps.Marker({
//         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//         map: map
//       });
//
//       google.maps.event.addListener(marker, 'click', (function(marker, i) {
//         return function() {
//           infowindow.setContent(locations[i][0]);
//           infowindow.open(map, marker);
//         }
//       })(marker, i));
//     }
//
//   })
//   .fail(() => {
//     console.log("map not generating");
//   })

$btn.click(searchIt);

})();
