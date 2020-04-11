var map;
var userLocation;

function ourMap () {
  var attributes = {
    center: { lat: 33.301, lng: -111.898 },
    zoom: 13
  };
  // standard map
  map = new google.maps.Map(document.getElementById('map'), attributes)
  // map for the users location after they accept the location allow popup
  userLocation = new google.maps.InfoWindow

  var inputArea = document.getElementById('searchArea')

  var searchBox = new google.maps.places.SearchBox(inputArea)

  // if statement for geolocation if true change lat long to users location, this is off but im not sure why the location is off
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (userPosition) {
        console.log(userPosition)
      var coords = {
        lat: userPosition.coords.latitude,
        lng: userPosition.coords.longitude
      };

      // below is a marker for your location
      userLocation.setPosition(coords)
      userLocation.setContent('You are here!')
      userLocation.open(map)
      map.setCenter(coords)
    },

    function () {
      handleLocationError('Location unavailable. Location is required', map.getCenter())
    })

  } 
  else {
    handleLocationError('Location unavailable. Location is required.', map.getCenter())
  }



  //places markers based off lat and long boundary
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  
  searchBox.addListener('places_changed', function () {
      
    var places = searchBox.getPlaces();
    // if places is not equal to 0 then it will return markers
    if (places.length == 0)
      return;

    markers.forEach(function (m) {m.setMap(null)});
    markers = [];
    console.log(markers);

    


    var bounds = new google.maps.LatLngBounds();
    //places being the restaurant of choice
    places.forEach(function(userPosition) {
        // if location not set to allow it will return nothing, location is required
      if (!userPosition.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: userPosition.name,
        position: userPosition.geometry.location
      }));

      if (userPosition.geometry.viewport)
        bounds.union(userPosition.geometry.viewport);
      else
        bounds.extend(userPosition.geometry.location);
    });
    
    map.fitBounds(bounds);
  });

  


}
function handleLocationError (content, coords) {
  userLocation.setPosition(coords);
  userLocation.setContent(content);
  userLocation.open(map);
}