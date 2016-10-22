'use strict';
(function() {

  $.getJSON(`/favorites`)
    .done((data) => {

      const locations = [];
      let j;

      for (j = 0; j < data.length; j++) {
        const place = data[j].name;
        const lat = parseFloat(data[j].latitude);
        const long = parseFloat(data[j].longitude);

        locations.push([place, lat, long, j]);
      }

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: new google.maps.LatLng(34.5133, -94.1629),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          { "featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#8dc63f"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#7e8083"}]}
          ]
      });

      const infowindow = new google.maps.InfoWindow();

      let marker;
      let i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i));
      }
    })
    .fail(() => {
      Materialize.toast('Map not generating', 3000);
    });
})();
