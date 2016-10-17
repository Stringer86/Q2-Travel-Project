(function() {
    'use strict';
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();

    // eslint-disable-next-line max-statements
    $('#signUpForm').submit((event) => {
      event.preventDefault();

      const email = $('#email').val().trim();
      const password = $('#password').val();
      console.log(email);

      if (!email) {
        return Materialize.toast('Email must not be blank', 3000);
      }

      if (email.indexOf('@') < 0) {
        return Materialize.toast('Email must be valid', 3000);
      }

      if (!password || password.length < 8) {
        return Materialize.toast(
          'Password must be at least 8 characters long',
          3000
        );
      }

      const options = { //req body
        contentType: 'application/json',
        data: JSON.stringify({ email, password }),
        dataType: 'json',
        type: 'POST',
        url: './routes/users'
      };

      $.ajax(options)
        .done(() => {
          window.location.href = 'user_search.html';
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
    });
  })();
