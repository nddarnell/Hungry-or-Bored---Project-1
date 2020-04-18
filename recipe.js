$(document).ready(function(){
    
    let modalInner = document.querySelector(".modal-inner");
    let modalOuter = document.querySelector(".modal-outer");
    //Listing call
    let currentSelection = "";
    let listingurl = "https://api.spoonacular.com/recipes/search?number=6&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
    //Build Page on initial page load
    buildList(listingurl);

    //Change list based on home screen dropdown
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
                let id = response.results[i].id;
                let baseUri = "";
                if (typeof response.baseUri !== "undefined"){
                    baseUri = response.baseUri;
                }
                console.log(baseUri);
                let recipePhoto = response.results[i].image;
                let recipeDiv = $("<div>");
                recipeDiv.addClass("card is-rounded recipe-list");
                let recipeImg = $("<img>").attr("src", baseUri + recipePhoto);
                recipeDiv.attr("data-value", id);
                recipeImg.addClass("card-image");
                recipeDiv.append(recipeImg);
                let recipeNameh2 = $("<h2>").text(recipeName);
                recipeNameh2.addClass("title is-4");
                recipeDiv.append(recipeNameh2);
                if (recipeCookTime !== undefined){
                    let recipeTimeP = $("<p>").text("Total cook time: " + recipeCookTime + " minutes");
                    recipeTimeP.addClass("sub-title is-2");
                    recipeDiv.append(recipeTimeP);
                }
                $("#recipe-append").append(recipeDiv);
            }
            }
        });
    }

    //Display popup with recipe steps
    $("#recipe-append").on("click",".recipe-list", function(){
        let recipeId = $(this).data("value");
        let ingredientsurl = "https://api.spoonacular.com/recipes/" + recipeId + "/ingredientWidget.json?apiKey=b1c4692acbe74405a4cfce6b5a43950d";
        let stepsurl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions?apiKey=b1c4692acbe74405a4cfce6b5a43950d";
        console.log(recipeId);
        specificRecipeSteps(stepsurl);
        specificRecipeIngredients(ingredientsurl)
        $("#append-recipe-details").empty();
    });
    
    function closeModal(){
        modalOuter.classList.remove('open');
    }
    
    // Click outside closes modal
    modalOuter.addEventListener('click', function(event){
        const isOutside = !event.target.closest('.modal-inner');
        if (isOutside) {
            modalOuter.classList.remove('open');
        }
    });
    
    //Specific URL call
    function specificRecipeSteps(stepsurl){
        $.ajax({
            url: stepsurl,
            method: 'GET',
        }).then(function(response){
            console.log(response);
             console.log(response[0].steps);
             modalOuter.classList.add('open');
             let stepOl = $("<ol>");
             $("#append-recipe-details").append(stepOl)
         for (let i = 0; i < response[0].steps.length; i++){
         let step = response[0].steps[i].step;
         let currentStep = $("<li>").text(step);
         stepOl.append(currentStep);
        }
        let stepsH1 = $("<h1>").text("Steps:")
        stepsH1.addClass("has-text-weight-bold")
        stepOl.prepend(stepsH1);
    });
}
function specificRecipeIngredients(ingredientsurl){
    $.ajax({
        url: ingredientsurl,
        method: 'GET',
    }).then(function(response){
        console.log(response);
        console.log(response.ingredients);
        let ingredientUl = $("<ul>");
        ingredientUl.addClass("ingredient-ul")
        $("#append-recipe-details").prepend(ingredientUl)
        for (let i = 0; i < response.ingredients.length; i++){
            let ingredient = response.ingredients[i].name;
            let ingredientvalue = response.ingredients[i].amount.us.value;
            let ingredientunit = response.ingredients[i].amount.us.unit;
            let currentIngredient = $("<li>").text(ingredient + " (" + ingredientvalue + " " + ingredientunit + ")");
            ingredientUl.append(currentIngredient);
            ingredientUl.append(currentIngredient);
        }
        let ingredientsH1 = $("<h1>").text("Ingredients:")
        ingredientsH1.addClass("has-text-weight-bold wrap-style")
        ingredientUl.prepend(ingredientsH1);
    });
}

    // Add specific ingredients to custom call
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

    // Clear ingredients
    $("#clear-ingredients").on("click", function(){
        $("#append-ingredients").empty();
        ingredientArray.length = 0;
    });

    // Use filter params to build list
    $("#filter-recipes").on("click", function(){
        let foodType = $("#food-type").find(':selected').data("value");
        let cookTime = $("#cook-time").find(':selected').data("value");
        let removeWhiteSpaces = ingredientArray.join(" ").trim().split(' ');
        let ingredientsList = removeWhiteSpaces.join();
        listingurl = "https://api.spoonacular.com/recipes/complexSearch?q=&cuisine=" + foodType + "&maxReadyTime=" + cookTime + "&includeIngredients=" + ingredientsList + "&number=6&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
        console.log(listingurl);
        buildList(listingurl);
    });
    
    // Generic Scroller
    $("[href^='#']").click(function(e) {
        e.preventDefault();
        var position = $($(this).attr("href")).offset().top;
        $("body, html").animate({
            scrollTop: position
        });
    });
    
});  
   
