$(document).ready(function(){

    let url = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=chicken&app_id=6fc42421&app_key=0454c8be186cea7eebbce3372c34508a"
    
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function(response){
        console.log(response);
    });
        
    
    
    });