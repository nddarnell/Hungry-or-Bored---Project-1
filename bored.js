let boredurl = "http://www.boredapi.com/api/activity/";

$.ajax({
    url: boredurl,
    method: 'GET'
}).then(function(response){
    console.log(response);
});
    


});