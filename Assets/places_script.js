// gets users requested search value
$(document).ready(function () {
    $("#get-location").on("click", function () {
      console.log(document.getElementById("searchArea").value);
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
      });
    });
});
// changing variables
var map;
var currentLocation;
var position;
var options;
var iwin;  
// function to generate map
function createMap() {
  currentLocation = new google.maps.Marker();
  
// grabs user position
navigator.geolocation.getCurrentPosition(function (p){
    position = { lat: p.coords.latitude, lng: p.coords.longitude };
    options = {
        center: position,
        zoom: 13
    }
    updatePosition();
  }); 
// this function updates the users position and set an icon of where they are
function updatePosition(){
    
    console.log(position);
    console.log(options)
    map = new google.maps.Map(document.getElementById("map-area"), options);
    currentLocation.setMap(map);
    currentLocation.setTitle("Home!");
    currentLocation.setPosition(position);
    currentLocation.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png")
    console.log(currentLocation)
    var input = document.getElementById("searchArea");

    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function(){
         searchBox.setBounds(map.getBounds())
     });
     var markers = [];
     iwin = new google.maps.InfoWindow();
     searchBox.addListener('places_changed', function(){
         var places = searchBox.getPlaces();

         if(places.length === 0)
            return;
        markers.forEach(function (m){
            m.setMap(null);
        });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        // marks each returned location
        places.forEach(function (p) {
            if(!p.geometry){
                return;
            } 
            console.log(p)
            var mark = new google.maps.Marker({
              map: map,
              title: p.name,
              position: p.geometry.location,
            });
            markers.push(
              mark
            );
            // this sets a star rating based off the rating of the business and using bootstrap may need to change this
            Math.round(p.rating);
            var rate = "";
            var oneEmpty = '<svg class="bi bi-star" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z" clip-rule="evenodd"/></svg>'
            var oneHalf = '<svg class="bi bi-star-half" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.354 5.119L7.538.792A.516.516 0 018 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0116 6.32a.55.55 0 01-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 01-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 01-.171-.403.59.59 0 01.084-.302.513.513 0 01.37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 01.163-.505l2.906-2.77-4.052-.576a.525.525 0 01-.393-.288L8.002 2.223 8 2.226v9.8z" clip-rule="evenodd"/></svg>'
            var oneFull = '<svg class="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>';
            // basically a large if statement looks for the rating and says if its .5 stars set the picture to be one half star image + empty star images etc.
            switch (Math.round(p.rating * 2) / 2) {
              case 0.5:
                rate = oneHalf + oneEmpty + oneEmpty + oneEmpty + oneEmpty;
                break;
              case 1:
                rate = oneFull + oneEmpty + oneEmpty + oneEmpty + oneEmpty;
                break;
              case 1.5:
                rate = oneFull + oneHalf + oneEmpty + oneEmpty + oneEmpty;
                break;
              case 2:
                rate = oneFull + oneFull + oneEmpty + oneEmpty + oneEmpty;
                break;
              case 2.5:
                rate = oneFull + oneFull + oneHalf + oneEmpty + oneEmpty;
                break;
              case 3:
                rate = oneFull + oneFull + oneFull + oneEmpty + oneEmpty;
                break;
              case 3.5:
                rate = oneFull + oneFull + oneFull + oneHalf + oneEmpty;
                break;
              case 4:
                rate = oneFull + oneFull + oneFull + oneFull + oneEmpty;
                break;
              case 4.5:
                rate = oneFull + oneFull + oneFull + oneFull + oneHalf;
                break;
              case 5:
                rate = oneFull + oneFull + oneFull + oneFull + oneFull;
                break;

              default:
                break;
            }
            google.maps.event.addListener(mark, 'click', function(){
                iwin.setContent(
                    // this appends the items to the name when you click the markers
                  "<h5>" + p.name + "</h5>" + "<p>" + p.formatted_address + "</p>" +'<p>'+rate+'</p>'+ '<p>' + p.rating +"/5</p>"
                );
              
                iwin.open(map, this);
            })

            if(p.geometry.viewport){
                bounds.union(p.geometry.viewport);
            }else{
              bounds.extend(p.geometry.location)
           }
        });
       map.fitBounds(bounds);
     })

}
}