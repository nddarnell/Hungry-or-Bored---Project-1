$(document).ready(function(){
    
    let modalInner = document.querySelector(".modal-inner");
    let modalOuter = document.querySelector(".modal-outer");
    //Listing call
    let currentSelection = "";
    let listingurl = "https://api.spoonacular.com/recipes/search?number=6&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
    buildList(listingurl);
    $("#homeMeal").on("click", function(){
        currentSelection = $(".is-hovered").val()
        let listingurl = "https://api.spoonacular.com/recipes/search?query=" + currentSelection + "&number=6&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
        console.log(listingurl);
        buildList(listingurl);
    });
    function buildList(listingurl){
        $.ajax({
            url: listingurl,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            $("#recipe-append").empty();
            if (response.totalResults == 0){
                let errorDiv = $("<div>");
                errorDiv.addClass("card notification errorDiv");
                let icon = $("<i>").addClass("fa fa-cutlery is-large")
                let errorh2 = $("<h2>").text("Sorry, this search returned no results");
                errorh2.addClass("is-size-1")
                errorDiv.append(icon, errorh2);
                $("#recipe-append").append(errorDiv);

            } else {
                for (let i = 0; i < 6; i++){
                let recipeName = response.results[i].title;
                let recipeCookTime = response.results[i].readyInMinutes;
                let baseUri = "";
                if (typeof response.baseUri !== "undefined"){
                     baseUri = response.baseUri;
                }
                console.log(baseUri);
                let recipePhoto = response.results[i].image;
                let id = response.results[i].id;
                let recipeDiv = $("<div>");
                recipeDiv.addClass("card is-rounded recipe-list");
                let recipeImg = $("<img>").attr("src", baseUri + recipePhoto);
                recipeDiv.attr("data-value", id);
                recipeImg.addClass("card-image");
                recipeDiv.append(recipeImg);
                let recipeNameh2 = $("<h2>").text(recipeName);
                recipeNameh2.addClass("title is-4");
                recipeDiv.append(recipeNameh2);
                let recipeTimeP = $("<p>").text("Total cook time: " + recipeCookTime + " minutes");
                recipeTimeP.addClass("sub-title is-2");
                recipeDiv.append(recipeTimeP);
                $("#recipe-append").append(recipeDiv);
            }
            }
        });


    }
    
    $("#recipe-append").on("click",".recipe-list", function(){
        let recipeId = $(this).data("value");
        let specificurl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions?apiKey=b1c4692acbe74405a4cfce6b5a43950d";
        console.log(recipeId);
        specificRecipe(specificurl);
        $("#append-recipe-details").empty();
    });
    
    function closeModal(){
        modalOuter.classList.remove('open');
    }
    
    modalOuter.addEventListener('click', function(event){
        const isOutside = !event.target.closest('.modal-inner');
        if (isOutside) {
            modalOuter.classList.remove('open');
        }
    });
    
    //Specific URL call
    function specificRecipe(specificurl){
        $.ajax({
            url: specificurl,
            method: 'GET',
        }).then(function(response){
            console.log(response[0].steps);
            modalOuter.classList.add('open');
            let stepOl = $("<ol>");
            $("#append-recipe-details").append(stepOl)
        for (let i = 0; i < response[0].steps.length; i++){
        let step = response[0].steps[i].step;
        let currentStep = $("<li>").text(step);
        stepOl.append(currentStep);

        }
        //Pop up modal
        //Add recipe content inside
        
    });
}
    let ingredientArray = [];
    $("#add-ingredient").on("click", function(){
        let ingredientLabel = $("<span>");
        ingredientLabel.addClass("tag is-light is-medium is-danger is-rounded");
        let ingredientInput = $("#get-ingredient").val();
        ingredientLabel.text(ingredientInput);
        ingredientArray.push(ingredientInput);
        $("#append-ingredients").prepend(ingredientLabel);
        $("#get-ingredient").val('');
    });

    $("#clear-ingredients").on("click", function(){
        $("#append-ingredients").empty();
        ingredientArray.length = 0;
    });

    $("#filter-recipes").on("click", function(){
        let foodType = $("#food-type").find(':selected').data("value");
        let cookTime = $("#cook-time").find(':selected').data("value");
        let removeWhiteSpaces = ingredientArray.join(" ").trim().split(' ');
        let ingredientsList = removeWhiteSpaces.join();
        listingurl = "https://api.spoonacular.com/recipes/complexSearch?q=&cuisine=" + foodType + "&maxReadyTime=" + cookTime + "&includeIngredients=" + ingredientsList + "&number=6&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
        console.log(listingurl);
        buildList(listingurl);
    });
 
    $("[href^='#']").click(function(e) {
        e.preventDefault();
        var position = $($(this).attr("href")).offset().top;
        $("body, html").animate({
            scrollTop: position
        } /* speed */ );
    });
    
});  
   
