(function() {
  'use strict';

  console.log('hello');

  $.getJSON('/token')
    .done((loggedIn) => {
      const $firstNavItems = $('.firstNavItem');
      const $secondNavItems = $('.secondNavItem');

      if (loggedIn) {
        const $favorites = $('<a>')
          .attr('href', '/favorites.html')
          .text('Favorites');

        const $logout = $('<a>').text('Log out');

        $logout.click((event) => {
          event.preventDefault();

          const options = {
            dataType: 'json',
            type: 'DELETE',
            url: '/token'
          };

          $.ajax(options)
            .done(() => {
              window.location.href = '/login.html';
            })
            .fail(() => {
              Materialize.toast('Unable to log out. Please try again.', 3000);
            });
        });

        $firstNavItems.append($favorites);
        $secondNavItems.append($logout);
      }

    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });

  window.QUERY_PARAMETERS = {};

  if (window.location.search) {
    window.location.search.substr(1).split('&').forEach((paramStr) => {
      const param = paramStr.split('=');

      window.QUERY_PARAMETERS[param[0]] = param[1];
    });
  }
})();
