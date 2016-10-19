(function() {
'use strict';


const $btn = $('.btn');
const $search = $('#search');
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
    console.log(data[0]);


  })
  .fail(() => {
    console.log("desciption not working");
  })

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

$(".button-collapse").sideNav();

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });


$('.button-collapse').sideNav({
    menuWidth: 600, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true
  }
);

$('input.autocomplete').autocomplete({
    data: {
      "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin",
      "Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship",
      "Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana",
      "Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait",
      "Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique",
      "Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon",
      "Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan",
      "Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
    }
  });

  })();


  var countryList = [
