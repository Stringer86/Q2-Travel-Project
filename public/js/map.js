(function() {
'use strict';

$.getJSON(`/favorites`)
  .done((data) => {

    const locations = [];

    for (let i = 0; i < data.length; i++) {
      let place = data[i].name;
      let lat = parseFloat(data[i].latitude);
      let long = parseFloat(data[i].longitude);

      locations.push([place, lat, long, i]);
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 1,
      center: new google.maps.LatLng(34.5133, -94.1629),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
      {
        featureType: 'all',
        stylers: [
          { hue: '#22aaaa' },
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels',
        stylers: [
          { visibility: 'off'}
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { visibility: 'off'}
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#63BDDB' },
          {saturation: 20}
        ]
      }
    ]
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

  })
  .fail(() => {
    console.log("map not generating");
  })

})();
