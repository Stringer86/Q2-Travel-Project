(function() {
    'use strict';

    function getPhotos() {

        let $xhr = $.getJSON(`https://pixabay.com/api/?q=${Search Input}&category=nature&key=3524767-02f5ba794561ee4931dcf448b`);

        $xhr.done(function(data) {
            if ($xhr.status !== 200) {
                return;
            }
        let hits = data.hits;
        let images = [];
        let photoIds = [];

        for (var i = 0; i <= 9; i++) {
          images.push(hits[i].webformatURL);
          photoIds.push(hits[i].id);
        }
        console.log(images);
        console.log(photoIds);
        });

    }
})();



// user inputs Search and presses button
// api request based on user Search
// search returns ids
//
// a second ajax request seaches based on id
// the ajax request grabs the urls
// the users seach page is populated with those images
