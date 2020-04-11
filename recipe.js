$(document).ready(function(){


    //Listing call
    let  foodType = "Thai"
    let listingurl = "https://api.spoonacular.com/recipes/search?number=5&instructionsRequired=true&apiKey=16b323f7162e4ff58af54ffcad8e3db2"
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
            recipeDiv.addClass("level notification");
            let recipeImg = $("<img>").attr("src", baseUri + recipePhoto);
            recipeImg.addClass("recipe-image-styles");
            recipeDiv.append(recipeImg);
            let recipeNameh2 = $("<h2>").text(recipeName);
            recipeDiv.append(recipeNameh2);
            let recipeTimeP = $("<p>").text(recipeCookTime);
            recipeDiv.append(recipeTimeP);
            $("#recipe-append").append(recipeDiv);
            let specificurl = "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?apiKey=16b323f7162e4ff58af54ffcad8e3db2";
            specificRecipe(specificurl);
        }
    });




    //Specific URL call
function specificRecipe(specificurl){
    $.ajax({
        url: specificurl,
        method: 'GET',
    }).then(function(response){
        console.log(response);
        
    });
}
        
    
});  
   
