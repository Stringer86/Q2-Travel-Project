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

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 1,
      center: new google.maps.LatLng(34.5133, -94.1629),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
      // {
      //   featureType: 'all',
      //   stylers: [
      //     { hue: '#22aaaa' },
      //   ]
      // },
      // {
      //   featureType: 'all',
      //   elementType: 'labels',
      //   stylers: [
      //     { visibility: 'off'}
      //   ]
      // },
      // {
      //   featureType: 'road',
      //   elementType: 'geometry',
      //   stylers: [
      //     { visibility: 'off'}
      //   ]
      // },
      // {
      //   featureType: 'water',
      //   elementType: 'geometry.fill',
      //   stylers: [
      //     { color: '#63BDDB' },
      //     {saturation: 20}
      //   ]
      // }
      // {"featureType":"landscape","stylers":[{"color":"#6c8080"},{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","stylers":[{"color":"#d98080"},{"hue":"#eeff00"},{"lightness":100},{"weight":1.5}]}]
          // {"featureType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"lightness":-100}]}
      {"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#8dc63f"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#7e8083"}]}
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
