//var map; function initMap() { map = new google.maps.Map(document.getElementById('map'), { center: {lat: -34.397, lng: 150.644}, zoom: 8 }); }

var locIDs = [
  "ChIJS7PBq4_Ft4kR4QsuIxqaUbk",//n natural
  "ChIJPfyBN8G3t4kRhaa6DHnl7Ss",//fiddleheads
  'ChIJYXTmIjW4t4kRdPU83SB_olg',//colestevens
  "ChIJ5wjAMd23t4kR_WDKjvHgiMg",//parlour
  "ChIJqRalpLvIt4kR_7kAyesZLxM",//jaha
  "ChIJWYFul-23t4kRLrYsgKElqRc",//halcyon
  "ChIJX-qTPpK8t4kRk8y1ZFBC1dY",//locxurious
  "ChIJNz2OuczIt4kRtsDUkECJjYo",//urban nature
  "ChIJd-CQJR3Pt4kR2Yt9hrsCL9Q",//the edge
  "ChIJ63ZgPFcvd0ARa7cFGfTRVYc"//signature image
]
var gmarkers = [];

function initMap() {
  var map = new
  
google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.9072, lng: -77.0369},
    zoom: 10
  });
  var infowindow = new google.maps.InfoWindow();
  var service1 = new google.maps.places.PlacesService(map);
for (i = 0; i <= locIDs.length; i++)
  	service1.getDetails({
    placeId: locIDs[i]
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
        
      });
      gmarkers.push(marker);
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>'  +
          place.formatted_address +'<br>'+
           '<br>'+'Rating: '+place.rating + '</div>');
        infowindow.open(map, this);
      });
    }
   });
  
  //the above asedfadgdfsjkgarkjgfndfkjg
  function codeAddress() {
  var address = document.getElementById('address').value;
  var radius = parseInt(document.getElementById('radius').value, 10)*1000;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      if (circle) circle.setMap(null);
      circle = new google.maps.Circle({center:marker.getPosition(),
                                     radius: radius,
                                     fillOpacity: 0.35,
                                     fillColor: "#FF0000",
                                     map: map});
      var bounds = new google.maps.LatLngBounds();
      for (var i=0; i<gmarkers.length;i++) {
        if (google.maps.geometry.spherical.computeDistanceBetween(gmarkers[i].getPosition(),marker.getPosition()) < radius) {
          bounds.extend(gmarkers[i].getPosition())
          gmarkers[i].setMap(map);
        } else {
          gmarkers[i].setMap(null);
        }
      }
      map.fitBounds(bounds);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
}
