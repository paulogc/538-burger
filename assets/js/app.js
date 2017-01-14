$(document).ready(function() {
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
