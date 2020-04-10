$(document).ready(function(){
    let apiKey = "AIzaSyDseF0zN9q-cCgNSM-jODuciBkv_ktc874"
    

    $('#search-input').keypress(function(e){
        if(e.which === 13){
                
                // localStorage.setItem("Choices", inputReturn)
                let location = $("#search-input").val();
                let q = location
                let mapURL = "https://www.google.com/maps/embed/v1/place?key="+ apiKey + "&q=" + q
                $("#map").attr("src", mapURL)
                console.log("working")
        }
        console.log("failing")
    });






});