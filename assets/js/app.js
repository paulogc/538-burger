$(document).ready(function() {
  $('.countdown-timer').countdown('2017/01/13', function(event) {
    $('.days', this).text(event.strftime('%D'));
    $('.hours', this).text(event.strftime('%H'));
    $('.minutes', this).text(event.strftime('%M'));
    $('.seconds', this).text(event.strftime('%S'));
  });

  $('nav').onePageNav({
    scrollOffset: 50,
    currentClass: 'active',
    changeHash: true,
  });

  $('nav a').click(function() {
    $('.navbar-toggle:visible').click();
  });

  var scrollTo = function (target) {
    if ($('#' + target).offset()) {
      $('html, body').animate({
        scrollTop: $('#' + target).offset().top - 50
      }, 500);
    }
  }

  $('#btn-registration').click(function(e) {
    e.preventDefault();
    scrollTo('form');
  });

  $('#subscribe-form').on('submit', function(e) {
    e.preventDefault();

    // get captcha response
    var recaptchaResp = grecaptcha.getResponse();

    // validate captach
    if (!recaptchaResp) {
      alert('Marque Não Sou Robo para registrar');
      return;
    }
    
    // get data from form
    var user = {}
    $(this).find('input').each(function(i) {
      var $input = $(this);
      user[$input.attr('name')] = $input.val().trim();
    });

    // validate required
    if (!user.nome || !user.email || !user.faculdade || !user.semestre) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    if (!IsEmailValid(user.email)) {
      alert('Email inválido');
      return;
    }

    // request
    $.ajax({
      url: 'subscribe.php',
      method: 'POST',
      data: { recaptchaResponse : recaptchaResp, user: user }
    }).done(function(result) {
      if (result) {
        alert(result);
        if (result.indexOf('sucesso') >= 0) {
          clearForm();
        }
      }
    }).fail(function(err) {
      console.log(err);
    }).always(function() {
      grecaptcha.reset();
    });
  });
});

function initMap() {
  var buguer = new google.maps.LatLng(-23.5409636,-46.6821588);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: buguer,
    scrollwheel: false,
    draggable: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    styles: [{
      'featureType': 'poi.business',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    }, {
      'featureType': 'poi.park',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    }]
  });
  var marker = new google.maps.Marker({
    position: buguer,
    map: map
  });

  // center on resize
  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(buguer);
    map.panBy(0, 0);
  });
}

function clearForm() {
  $('#subscribe-form input').each(function(i) {
    var $input = $(this);
    $input.val('');
  });
}

function IsEmailValid(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  }else{
    return true;
  }
}
