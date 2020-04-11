$(document).ready(function(){


    //Listing call
    let listingurl = "https://api.spoonacular.com/recipes/search?number=5&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
    $.ajax({
        url: listingurl,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        for (let i = 0; i < 5; i++){
            let recipeName = response.results[i].title;
            let recipeCookTime = response.results[i].readyInMinutes;
            let baseUri = response.baseUri;
            let recipePhoto = response.results[i].image;
            let id = response.results[i].id;
            let recipeDiv = $("<div>");
            recipeDiv.addClass("level notification recipe-list");
            let recipeImg = $("<img>").attr("src", baseUri + recipePhoto);
            recipeDiv.attr("data-value", id);
            recipeImg.addClass("recipe-image-styles");
            recipeDiv.append(recipeImg);
            let recipeNameh2 = $("<h2>").text(recipeName);
            recipeDiv.append(recipeNameh2);
            let recipeTimeP = $("<p>").text("Total cook time: " + recipeCookTime + " minutes");
            recipeDiv.append(recipeTimeP);
            $("#recipe-append").append(recipeDiv);
        }
    });
    
    
    $("#recipe-append").on("click",".recipe-list", function(){
        let recipeId = $(this).data("value");
        let specificurl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions?apiKey=b1c4692acbe74405a4cfce6b5a43950d";
        console.log(recipeId);
        specificRecipe(specificurl);
    });



    //Specific URL call
function specificRecipe(specificurl){
    $.ajax({
        url: specificurl,
        method: 'GET',
    }).then(function(response){
        console.log(response[0].steps.length);
        //Pop up modal
        //Add recipe content inside
        
    });
}
        
    
});  
   
